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

    // publishedSemaines
    
    this.selectionService.getPublishedInterclubsSemaines()
      .subscribe(
        semaines => {
          this.publishedSemaines = semaines;
          console.log('published semaines', semaines);
        }
    );
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

  brol()
  {
    for( const team of this.teamsByInterclubsCategory)
    {
      const match = this.matches.find( m => m.awayTeamId === team.TeamId || m.homeTeamId === team.TeamId);
      // match: InterclubsMatchModel, version: InterclubsSemaineVersionModel
      
      const selections = this.selectionService.getSelection(match, this.selectedPublishedSemaine)
        .subscribe();
    }
  }
}
