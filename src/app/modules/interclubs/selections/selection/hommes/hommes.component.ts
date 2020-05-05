import { Component, OnInit, Input } from '@angular/core';
import { InterclubsSemaineModel } from '../../model/interclubs-semaine.model';
import { MatSelectChange } from '@angular/material/select';
import { InterclubsLDF } from '../../model/interclubs-ldf.model';
import { InterclubsTeamModel } from '../../model/interclubs-team.model';
import { InterclubsMatchModel } from '../../model/interclubs-match.model';

@Component({
  selector: 'app-interclubs-selections-hommes',
  templateUrl: './hommes.component.html',
  styleUrls: ['./hommes.component.scss']
})
export class HommesComponent implements OnInit {

  @Input()
  semaines: Array<InterclubsSemaineModel>;
  
  @Input()
  listeDesForces: Array<InterclubsLDF>;
  
  @Input()
  teams: Array<InterclubsTeamModel>;

  @Input()
  matches: Array<InterclubsMatchModel>;
  
  selectedSemaine: InterclubsSemaineModel=null;
  selectedTeam: InterclubsTeamModel=null;
  selectedMatch: InterclubsMatchModel = null;

  loading=true;
  selectedLdfRow =-1;

  constructor() { }

  ngOnInit(): void 
  {
    //console.log('Liste des forces - Hommes:', this.listeDesForces);
    console.log('Liste des matches - Hommes:', this.matches);
  }

  
  onChangeSemaine(event: MatSelectChange)
  {
    this.selectedSemaine = event.value;
    console.log('semaine sélectionnée:', this.selectedSemaine);
    
  }

  onChangeTeam(event: MatSelectChange)
  {
    this.selectedTeam = event.value;
    console.log('équipe sélectionnée:', this.selectedTeam);
    this.selectedMatch = this.matches.find( m => 
      m.WeekName === this.selectedSemaine.weekName
      && ( m.homeTeamId === this.selectedTeam.TeamId || m.awayTeamId === this.selectedTeam.TeamId ) 
    );
    console.log('selected match', this.selectedMatch);
  }

  setClickedLdfRow(index: number, item: InterclubsLDF)
  {
    console.log('ldf row clicked', index, item);
    this.selectedLdfRow=index;
  }
}
