import { Component, OnInit, Input } from '@angular/core';
import { InterclubsSemaineModel } from '../../model/interclubs-semaine.model';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-interclubs-selections-hommes',
  templateUrl: './hommes.component.html',
  styleUrls: ['./hommes.component.scss']
})
export class HommesComponent implements OnInit {

  @Input()
  semaines: Array<InterclubsSemaineModel>;
  
  selectedSemaine: InterclubsSemaineModel=null;

  loading=true;

  constructor() { }

  ngOnInit(): void 
  {

  }

  
  onChangeSemaine(event: MatSelectChange)
  {
    this.selectedSemaine = event.value;
    console.log('semaine sélectionnée:', this.selectedSemaine);
  }
}
