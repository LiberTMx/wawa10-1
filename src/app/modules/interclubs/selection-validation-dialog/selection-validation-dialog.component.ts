import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InterclubsCategoryModel } from '../selections/model/interclubs-category.model';
import { InterclubsSemaineModel } from '../selections/model/interclubs-semaine.model';
import { InterclubsSemaineVersionModel } from '../selections/model/interclubs-semaine-version.model';
import { InterclubsTeamModel } from '../selections/model/interclubs-team.model';
import { InterclubsMatchModel } from '../selections/model/interclubs-match.model';
import { SelectionService } from '../selections/services/selection.service';
import { InterclubsSelectionModel } from '../selections/model/interclubs-selection.model';

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
    matches: Array<InterclubsMatchModel>
  };

  loading = true;
  loadingInfos: string;

  storedSelectionsMap: Map<InterclubsTeamModel, Array<InterclubsSelectionModel> > 
                              = new Map<InterclubsTeamModel, Array<InterclubsSelectionModel> >();

  // Diagnotics
  validating=true;
  selectionCount=0;
  attendedSelectionCount=0;

  validationResults: Array<{team: InterclubsTeamModel, rule1: boolean, rule2: boolean, rule3: boolean, tSize: number}>
    =new Array<{team: InterclubsTeamModel, rule1: boolean, rule2: boolean, rule3: boolean, tSize: number}>();

  constructor(
    private dialogRef: MatDialogRef<SelectionValidationDialogComponent>,

    @Inject(MAT_DIALOG_DATA)
    data: {
      interclubCategory: InterclubsCategoryModel, 
      selectedSemaine: InterclubsSemaineModel, 
      selectedSemaineVersion: InterclubsSemaineVersionModel,
      teams: Array<InterclubsTeamModel>, 
      matches: Array<InterclubsMatchModel>
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

    this.validateSelections(teamSize);
  }

  evaluateAttendedSelectionCount(teamSize: number)
  {
    const teams = this.infos.teams;
    this.attendedSelectionCount = (teams!==null && teams!==undefined && teams.length>0) ? teams.length * teamSize : null;
  }

  loadSelectionByTeam(teamSize: number)
  {
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
                }
              }
              else
              {
                console.log('NO Selections for team '+team.Team+' !!! ');
              }
            }
            ,
            err => console.error(err)
            ,
            () => {
              if(c===teams.length) this.loading = false;
            }
          );
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
    ///const selectedPlayer: any;

    // {team: InterclubsTeamModel, rule1: boolean, rule2: boolean, rule3: boolean}
    let teamNumber = 0;
    
    for(const team of this.infos.teams)
    { 
      let rule1=true;
      let rule2=true; 
      let rule3=true;

      teamNumber++;
      let tSize=0;
      const rankingIndexMin = (teamNumber - 1 ) * teamSize + 1;
      const rankingIndexMax = rankingIndexMin + teamSize - 1 ;
      const selections = this.storedSelectionsMap.get(team);
      if(selections===null || selections===undefined) 
      { 
        rule3 = false;
      }
      else
      {
        tSize = selections.length;
        rule3 = (tSize === teamSize);
      }

      this.validationResults.push(
        {team, rule1, rule2, rule3, tSize}
      );
    }
    this.validating=false;
  }

}
