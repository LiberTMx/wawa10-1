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

  afttTeams: Array<AfttTeamEntity>=null;
  afttDivisions: Array<AfttDivisionEntity>=null;
  afttMembers: Array<AfttMemberByCategoryEntity>=null;

 

  constructor(
    private adminService: AdminService,
  ) { }

  ngOnInit(): void 
  { 
    this.loadData();
  }

  loadData()
  {
    this.afttSyncInfo=null;
    this.afttDivisionCategories=null;

    this.afttTeams=null;
    this.afttDivisions=null;
    this.afttMembers=null;

    this.adminService.getLastAfttSyncInfo()
    .subscribe(res => {
      this.afttSyncInfo = res;

      this.adminService.getAfttDivisionCategories()
        .subscribe(div => this.afttDivisionCategories = div);

      this.adminService.getAfttTeams(this.afttSyncInfo.id)
        .subscribe(teams => this.afttTeams = teams);
      
      this.adminService.getAfttDivisions(this.afttSyncInfo.id)
        .subscribe(divisions => this.afttDivisions = divisions);

      this.adminService.getAfttMembers(this.afttSyncInfo.id)
        .subscribe(afttMembers => {
          this.afttMembers = afttMembers;
          //console.log('interclubs - afttMembers', afttMembers);
        });
    });
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
  } */

  

  }
}
