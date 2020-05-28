import { Component, OnInit } from '@angular/core';
import { InterclubsCategoryModel } from '../selections/model/interclubs-category.model';
import { InterclubsSemaineModel } from '../selections/model/interclubs-semaine.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SelectionService } from '../selections/services/selection.service';
import { InterclubsTeamModel } from '../selections/model/interclubs-team.model';
import { InterclubsMatchModel } from '../selections/model/interclubs-match.model';
import { InterclubsSemaineVersionModel } from '../selections/model/interclubs-semaine-version.model';
import { ToastMessageService } from 'src/app/common/services/toast-message.service';
import { InterclubsTeamSelectionDataModel } from '../selections/model/interclubs-team-selection-data.model';
import { InterclubsLDF } from '../selections/model/interclubs-ldf.model';
import { InterclubsLdfParticipantModel } from '../selections/model/interclubs-ldf-participant.model';
import { InterclubsLdfByCategoryModel } from '../selections/model/interclubs-ldf-by-category.model';



@Component({
  selector: 'app-selection-information',
  templateUrl: './selection-information.component.html',
  styleUrls: ['./selection-information.component.scss']
})
export class SelectionInformationComponent implements OnInit {
  
  semaines: Array<InterclubsSemaineModel>;
  semainesByInterclubsCategory: Array<InterclubsSemaineModel>;

  publishedSemaines: Array<InterclubsSemaineVersionModel>;
  selectedPublishedSemaine: InterclubsSemaineVersionModel;

  selectedSemaine: InterclubsSemaineModel;

  interclubs: Array<InterclubsCategoryModel>;

  selectedCategory: InterclubsCategoryModel;

  teams: Array<InterclubsTeamModel>;
  teamsByInterclubsCategory: Array<InterclubsTeamModel>;

  matches: Array<InterclubsMatchModel>;

  
  teamSelectionData: Array<InterclubsTeamSelectionDataModel> = null;

  ldfParticipants: Array<InterclubsLdfParticipantModel>;
  ldfByCategory: Array<InterclubsLdfByCategoryModel>;
  listeDesForces: Array<InterclubsLDF>;

  teamCount: number;
  loadedTeamCount: number;

  constructor(
    private selectionService: SelectionService,
    private toastMessageService: ToastMessageService,
  ) { }

  ngOnInit(): void 
  {
    this.selectionService.getInterclubsCategories()
      .subscribe(
        res => this.interclubs = res
    );
      
    this.selectionService.getInterclubsSemaineByInterclubType(0)
      .subscribe(
        res => this.semaines = res
    );

    this.selectionService.getInterclubsTeams()
    .subscribe(
      teams => {
        this.teams = teams;
      }
    );

    this.selectionService.getInterclubsMatches()
      .subscribe(
        matches => {
          this.matches = matches;
        }
    );

    this.selectionService.getInterclubsLDFParticipants()
      .subscribe(
        participants => {
          this.ldfParticipants = participants;
        }
    );

    // Chargement de la composition des listes de forces
    this.selectionService.getInterclubsLDFByCategory()
      .subscribe(
        compositions => {
          this.ldfByCategory = compositions;
          console.log('Toutes les données interclubs ont étées lues');
        }
    );

    // publishedSemaines
    
    this.selectionService.getPublishedInterclubsSemaines()
      .subscribe(
        semaines => {
          this.publishedSemaines = semaines;
          console.log('published semaines', semaines);
        }
    );
  }
  
  buildListeDesForcesByCategory(category: InterclubsCategoryModel): Array<InterclubsLDF>
  {
    //console.log('Building ldf for catg:', category);

    const ldf=new Array<InterclubsLDF>();

    const ldfCats = this.ldfByCategory.filter( c => c.playerCategory === category.playerCategory);
    if(ldfCats!==null && ldfCats!==undefined)
    {
      for(const ldfCat of ldfCats)
      {
        const participant = this.ldfParticipants.find( p => p.id === ldfCat.participantId);
        if(participant!==null && participant!==undefined)
        {
          ldf.push( new InterclubsLDF( participant, ldfCat) );
        }
      }
    }

    // Faut maintenant trier la ldf dans le bon ordre !
    ldf.sort( (p1, p2) => {
      if(p1.listeDeForce.position < p2.listeDeForce.position) return -1;
      if(p1.listeDeForce.position > p2.listeDeForce.position) return +1;
      return 0;
    } );

    // console.log('ldf', ldf);

    return ldf;
  }
  
  getFilteredSemaineByCategory(category: InterclubsCategoryModel): Array<InterclubsSemaineModel>
  {
    if(this.semaines===null || this.semaines===undefined) return null;
    const filteredSemaines=this.semaines.filter( s => s.afftDivisionCategoryId === category.playerCategory );
    filteredSemaines.sort( (s1, s2) => {
      if(s1.weekName < s2.weekName) return -1;
      if(s1.weekName > s2.weekName) return +1;
      return 0;
    });
    return filteredSemaines;
  }

  onChangeCategory(event)
  {
    this.semainesByInterclubsCategory = this.getFilteredSemaineByCategory(this.selectedCategory);
    this.teamsByInterclubsCategory = this.getFilterTeamsByCategory(this.selectedCategory);
    this.listeDesForces=this.buildListeDesForcesByCategory(this.selectedCategory);
  }
 
  onChangeSemaine(event)
  {
    console.log('onChangeSemaine', this.selectedSemaine);

    if(this.publishedSemaines === null || this.publishedSemaines===undefined || this.publishedSemaines.length === 0 ) 
    {
      this.selectedPublishedSemaine=null;
      this.toastMessageService.addError('Selection', 'Pas de selection publiées pour la semaine choisie: '+this.selectedSemaine.weekName ,11000);
      return;
    }

    this.selectedPublishedSemaine=this.publishedSemaines.find( ps => ps.semaine_id === this.selectedSemaine.id );
    console.log('found published version:', this.selectedPublishedSemaine);

    if(this.selectedPublishedSemaine===null || this.selectedPublishedSemaine===undefined)
    {
      this.selectedPublishedSemaine=null;
      this.toastMessageService.addError('Selection', 'Pas de selection publiées pour la semaine choisie: '+this.selectedSemaine.weekName ,11000);
      return;
    }

    this.collectTeamData();
  }

  getFilterTeamsByCategory(category: InterclubsCategoryModel): Array<InterclubsTeamModel>
  {
    if(this.teams===null || this.teams===undefined) return null;
    const filterTeams =  this.teams.filter( t => t.DivisionCategory === category.id );

    filterTeams.sort( (t1, t2) => {
      if(t1.Team < t2.Team) return -1;
      if(t1.Team > t2.Team) return +1;
      return 0;
    });
    return filterTeams;
  }

  collectTeamData()
  {
    const teamSelectionDataArray: Array<InterclubsTeamSelectionDataModel> = new Array<InterclubsTeamSelectionDataModel>();
    // this.teamSelectionData=teamSelectionDataArray;

    this.teamCount=this.teamsByInterclubsCategory.length;
    this.loadedTeamCount=0;
    for(const team of this.teamsByInterclubsCategory)
    {
      const teamSelectionData: InterclubsTeamSelectionDataModel = new InterclubsTeamSelectionDataModel();
      // Team
      teamSelectionData.team = team;
      // Match
      const match = this.matches.find( m => 
        m.WeekName === this.selectedSemaine.weekName
        && ( m.homeTeamId === team.TeamId || m.awayTeamId === team.TeamId ) 
      );

      // const match = this.matches.find( m => m.awayTeamId === team.TeamId || m.homeTeamId === team.TeamId);
      teamSelectionData.match = match;

      // Selection
      const selections = this.selectionService.getSelection(match, this.selectedPublishedSemaine)
        .subscribe(
          selections => {
            if(selections!==null && selections !==undefined && selections.length>0)
            {
              const teamSelections: Array<InterclubsLDF> = new Array<InterclubsLDF>();
              for(const sel of selections)
              {
                const part: InterclubsLDF = this.listeDesForces.find( p => p.participant.authUserId === sel.auth_user_id);
                teamSelections.push(part);
              }
              teamSelectionData.selections = teamSelections;
              
              teamSelectionDataArray.push(teamSelectionData);

              // Object.assign(this.teamSelectionData, teamSelectionDataArray);
              console.log('Selections for team '+team.Team, teamSelectionData);
            }
            teamSelectionData.selectionsLoaded=true;
            this.loadedTeamCount++;

            if(this.teamCount === this.loadedTeamCount)
            {
              this.teamSelectionData = teamSelectionDataArray;
            }
          },
          err=>console.error('err', err)
  
        );

      // Informations
      //teamSelectionDataArray.push(teamSelectionData);
    }

    //this.teamSelectionData = teamSelectionDataArray;
  }
}
