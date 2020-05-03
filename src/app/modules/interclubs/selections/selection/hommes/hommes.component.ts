import { Component, OnInit, Input } from '@angular/core';
import { InterclubsSemaineModel } from '../../model/interclubs-semaine.model';
import { MatSelectChange } from '@angular/material/select';
import { InterclubsLDF } from '../../model/interclubs-ldf.model';
import { InterclubsTeamModel } from '../../model/interclubs-team.model';

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
  
  selectedSemaine: InterclubsSemaineModel=null;
  selectedTeam: InterclubsSemaineModel=null;

  loading=true;
  selectedLdfRow =-1;

  constructor() { }

  ngOnInit(): void 
  {
    console.log('Liste des forces - Hommes:', this.listeDesForces);
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
  }

  setClickedLdfRow(index: number, item: InterclubsLDF)
  {
    console.log('ldf row clicked', index, item);
    this.selectedLdfRow=index;
  }
}
