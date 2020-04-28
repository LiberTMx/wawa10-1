import { Component, OnInit, Input } from '@angular/core';
import { InterclubsSemaineModel } from '../../model/interclubs-semaine.model';

@Component({
  selector: 'app-interclubs-selections-hommes',
  templateUrl: './hommes.component.html',
  styleUrls: ['./hommes.component.scss']
})
export class HommesComponent implements OnInit {

  @Input()
  semaines: Array<InterclubsSemaineModel>;
  
  constructor() { }

  ngOnInit(): void {
  }

}
