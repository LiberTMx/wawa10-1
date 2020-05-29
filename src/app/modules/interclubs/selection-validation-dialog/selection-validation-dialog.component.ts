import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InterclubsCategoryModel } from '../selections/model/interclubs-category.model';
import { InterclubsSemaineModel } from '../selections/model/interclubs-semaine.model';
import { InterclubsSemaineVersionModel } from '../selections/model/interclubs-semaine-version.model';
import { InterclubsTeamModel } from '../selections/model/interclubs-team.model';
import { InterclubsMatchModel } from '../selections/model/interclubs-match.model';
import { SelectionService } from '../selections/services/selection.service';
import { InterclubsSelectionModel } from '../selections/model/interclubs-selection.model';
import { InterclubsLDF } from '../selections/model/interclubs-ldf.model';

@Component({
  selector: 'app-selection-validation-dialog',
  templateUrl: './selection-validation-dialog.component.html',
  styleUrls: ['./selection-validation-dialog.component.scss']
})
export class SelectionValidationDialogComponent implements OnInit {

  infos: {
    interclubCategory: InterclubsCategoryModel, 
    selectedSemaine: InterclubsSemaineModel, 
    selectedSemaineVersion: InterclubsSemaineVersionModel,
    teams: Array<InterclubsTeamModel>, 
    matches: Array<InterclubsMatchModel>,
    listeDesForces: Array<InterclubsLDF>
  };

  loading = true;
  loadingInfos: string;

  storedSelectionsMap: Map<InterclubsTeamModel, Array<InterclubsSelectionModel> > 
                              = new Map<InterclubsTeamModel, Array<InterclubsSelectionModel> >();

  
  // Diagnotics
  validating=true;
  selectionCount=0;
  attendedSelectionCount=0;

  validationResults: Array<{team: InterclubsTeamModel, rule1: boolean, rule2: boolean, rule3: boolean, tSize: number, color: string}>
    =new Array<{team: InterclubsTeamModel, rule1: boolean, rule2: boolean, rule3: boolean, tSize: number, color: string}>();

  playerToTeamMap: Map<InterclubsSelectionModel, Array<InterclubsTeamModel> >;

  multipleSelections: Array<{ldf: InterclubsLDF, teams: Array<InterclubsTeamModel>} >;

  constructor(
    private dialogRef: MatDialogRef<SelectionValidationDialogComponent>,

    @Inject(MAT_DIALOG_DATA)
    data: {
      interclubCategory: InterclubsCategoryModel, 
      selectedSemaine: InterclubsSemaineModel, 
      selectedSemaineVersion: InterclubsSemaineVersionModel,
      teams: Array<InterclubsTeamModel>, 
      matches: Array<InterclubsMatchModel>,
      listeDesForces: Array<InterclubsLDF>
    },

    private selectionService: SelectionService,
  ) 
  {
    this.infos = data;
  }

  ngOnInit(): void 
  {
    console.log('Validating selection for interclubs:', this.infos);

    const teamSize = this.infos.interclubCategory.playerCategory === 1 ? 4 : 3;
    this.evaluateAttendedSelectionCount(teamSize);

    this.loadSelectionByTeam(teamSize);

    
  }

  evaluateAttendedSelectionCount(teamSize: number)
  {
    const teams = this.infos.teams;
    this.attendedSelectionCount = (teams!==null && teams!==undefined && teams.length>0) ? teams.length * teamSize : null;
  }

  loadSelectionByTeam(teamSize: number)
  {
    // Pour verifier si un joueur est placé plusieurs fois dans 1 ou 2 équipes
    const playerToTeamMap: Map<InterclubsSelectionModel, Array<InterclubsTeamModel> > = new Map<InterclubsSelectionModel, Array<InterclubsTeamModel>>();

    const teams = this.infos.teams;
    if(teams!==null && teams!==undefined && teams.length>0)
    {
      let c=0;
      for(const team of teams)
      {
        c++;
        const match=this.findMatchForTeam(team);
        this.loadingInfos='Loading selection for team '+team.Team + ', match:'+match.MatchId;
        this.selectionService.getSelection(match, this.infos.selectedSemaineVersion)
          .subscribe(
            selections => {
              if(selections !== null && selections!==undefined && selections.length>0 )
              {
                console.log('Selections for team '+team.Team+': '+selections.length);
                const validSelections = selections.filter( s => s.position <= teamSize);
                if(validSelections!==null && validSelections!==undefined && validSelections.length>0 )
                {
                  this.storedSelectionsMap.set(team, validSelections);
                  this.selectionCount += validSelections.length;
                  this.mapPlayerToTeam(team, playerToTeamMap, validSelections);
                }
              }
              else
              {
                console.log('NO Selections for team '+team.Team+' !!! ');
                this.storedSelectionsMap.set(team, null);
              }
              if(c===teams.length)
              {
                this.loading = false;
                this.validateSelections(teamSize);
              } 
            }
            ,
            err => console.error(err)
            ,
            () => {
              //if(c===teams.length) this.loading = false;
            }
          );
      }
    }

    this.playerToTeamMap=playerToTeamMap;

  }

  private mapPlayerToTeam(
      team: InterclubsTeamModel,
      playerToTeamMap: Map<InterclubsSelectionModel, Array<InterclubsTeamModel> >, 
      validSelections: Array<InterclubsSelectionModel>)
  {
    for(const sel of validSelections)
    {

      let arr=null;
      for (const entry of this.playerToTeamMap.entries()) 
      {
        console.log(entry[0], entry[1]);   
        if(entry[0].auth_user_id === sel.auth_user_id)
        {
          arr=entry[1];
        }
      }

      //let arr = playerToTeamMap.get(sel);

      if(arr===null || arr === undefined)
      {
        arr = new Array<InterclubsTeamModel>();
        arr.push(team);
        playerToTeamMap.set(sel, arr);
      }
      else
      {
        arr.push(team);
      }
    }
  }

  findMatchForTeam(team: InterclubsTeamModel): InterclubsMatchModel
  {
    return this.infos.matches.find( m => 
      m.WeekName === this.infos.selectedSemaine.weekName
      && ( m.homeTeamId === team.TeamId || m.awayTeamId === team.TeamId ) 
    );
  }

  onCloseDialog() 
  {
    this.dialogRef.close(null);
  }

  validateSelections(teamSize: number)
  {
    
    this.validationResults=new Array<
      {team: InterclubsTeamModel, rule1: boolean, rule2: boolean, rule3: boolean, tSize: number, color: string}
      >();
    ///const selectedPlayer: any;

    // {team: InterclubsTeamModel, rule1: boolean, rule2: boolean, rule3: boolean}
    let teamNumber = 0;
    
    const selectionMultiple=null;

    let previousTeam=null;
    let previousSelections=null;
    let rule4=true;

    for(const team of this.infos.teams)
    { 
      let rule1=true;//C.22.11 Un joueur ne peut être aligné à une place plus basse que celle indiquée par son indice de référence.
      let rule2=true;//C.22.13 Le premier joueur d'une équipe ne peut avoir un indice de référence plus petit 
                     //que celui du troisième joueur de l'équipe supérieure <br> 
      let rule3=true;// Vérifier aussi que dans chaque équipe on a au min 3 joueurs (2 pour les dames)

      // rule4: un joueur ne peut être sélectionné qu'une seule fois !
      teamNumber++;
      let tSize=0;
      const rankingIndexMin = (teamNumber - 1 ) * teamSize + 1;
      const rankingIndexMax = rankingIndexMin + teamSize - 1 ;
      const selections = this.storedSelectionsMap.get(team);
      console.log('selection team '+team.Team, selections);
      if(selections===null || selections===undefined) 
      { 
        rule3 = false;// regle 3 non respectée
      }
      else
      {
        tSize = selections.length;
        rule3 = (tSize === teamSize || tSize === teamSize-1 );

        // verif rule 1
        console.log('verify rule 1 ', rankingIndexMin, rankingIndexMax);
        for(const sel of selections)
        {
          if(sel.ranking_index<rankingIndexMin /*|| sel.ranking_index > rankingIndexMax*/) 
          {
            rule1=false;
            console.log('rule 1 not respected', sel);
          }
        }
      }

      // rule 2
      if(previousTeam!==null && previousSelections!==null && previousSelections!==undefined && previousSelections.length>0
        && selections!==null && selections!==undefined && selections.length>0 )
      {
        const currentTeamFirstPlayer=selections.find( s => s.position === 1);
        const previousTeamThirdPlayer=previousSelections.find( s => s.position === 3);

        if(currentTeamFirstPlayer!==null && currentTeamFirstPlayer!==undefined && previousTeamThirdPlayer!==null && previousTeamThirdPlayer!==undefined)
        {
          if(currentTeamFirstPlayer.ranking_index < previousTeamThirdPlayer.ranking_index) rule2=false;
        }
      }


      const color=(rule1 && rule2 && rule3) ? 'color: green;' : 'color: red; font-weight: bold;';
      this.validationResults.push(
        {team, rule1, rule2, rule3, tSize, color}
      );

      previousTeam=team;
      previousSelections=selections;
    }

    // rule 4: selections multiples
    if( this.playerToTeamMap!==null && this.playerToTeamMap!==undefined)
    {
      const multipleSelections: Array<{ldf: InterclubsLDF, teams: Array<InterclubsTeamModel>} >
                            = new Array<{ldf: InterclubsLDF, teams: Array<InterclubsTeamModel>} >();

      // playerToTeamMap: Map<InterclubsSelectionModel, Array<InterclubsTeamModel> >;
      //const keys=this.playerToTeamMap.keys;
      for (const entry of this.playerToTeamMap.entries()) 
      {
        console.log(entry[0], entry[1]);
        if(entry[1]!==null && entry[1]!==undefined && entry[1].length>1)
        {
          rule4=false;

          const sel: InterclubsSelectionModel=entry[0];
          const teams: Array<InterclubsTeamModel>=entry[1];
          const ldf: InterclubsLDF = this.infos.listeDesForces.find( p => p.participant.authUserId === sel.auth_user_id);

          multipleSelections.push(
            {ldf, teams}
          );
        }
      }

      if(!rule4)
      {
        this.multipleSelections = multipleSelections;
      }

    }
    this.validating=false;
  }

}
