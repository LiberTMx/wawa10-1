import { Component, OnInit, Input } from '@angular/core';
import { AfttMatchTypeEntity } from '../model/aftt/aftt-match-type.model';

@Component({
  selector: 'app-admin-supported-match-types',
  templateUrl: './supported-match-types.component.html',
  styleUrls: ['./supported-match-types.component.scss']
})
export class SupportedMatchTypesComponent implements OnInit {

  @Input()
  afttMatchTypes: Array<AfttMatchTypeEntity>;

  constructor() { }

  ngOnInit(): void 
  {
  }

}
