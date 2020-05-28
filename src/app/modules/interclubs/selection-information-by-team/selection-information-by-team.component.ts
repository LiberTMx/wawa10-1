import { Component, OnInit, Input } from '@angular/core';
import { flyInOut } from 'ng-uikit-pro-standard';
import { InterclubsTeamSelectionDataModel } from '../selections/model/interclubs-team-selection-data.model';
import { InterclubsLDF } from '../selections/model/interclubs-ldf.model';

@Component({
  selector: 'app-selection-information-by-team',
  templateUrl: './selection-information-by-team.component.html',
  styleUrls: ['./selection-information-by-team.component.scss']
})
export class SelectionInformationByTeamComponent implements OnInit {

  @Input()
  teamData: InterclubsTeamSelectionDataModel;

  @Input()
  selections: Array<InterclubsLDF>;
  
  constructor() { }

  ngOnInit(): void 
  {
  }

}
