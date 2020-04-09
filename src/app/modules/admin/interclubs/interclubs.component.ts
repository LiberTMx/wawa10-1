import { Component, OnInit } from '@angular/core';
import { AfttClubTeamModel } from './model/aftt-team.model';

@Component({
  selector: 'app-interclubs',
  templateUrl: './interclubs.component.html',
  styleUrls: ['./interclubs.component.scss']
})
export class InterclubsComponent implements OnInit {

  afttClubMessieursTeamModel: AfttClubTeamModel=null;
  afttClubDamesTeamModel: AfttClubTeamModel=null;
  afttClubAineesTeamModel: AfttClubTeamModel=null;
  afttClubVeteransTeamModel: AfttClubTeamModel=null;
  afttClubJeunesTeamModel: AfttClubTeamModel=null;

  constructor() { }

  ngOnInit(): void {
  }

  onReceiveTeams(type: number, event)
  {
    console.log('onReceiveTeams', event);
    switch(type)
    {
      case 1: this.afttClubMessieursTeamModel=event; break;
      case 2: this.afttClubDamesTeamModel=event; break;
      case 3: this.afttClubVeteransTeamModel=event; break;
      case 4: this.afttClubAineesTeamModel=event; break;
      case 5: this.afttClubJeunesTeamModel=event; break;
    }
  }
}
