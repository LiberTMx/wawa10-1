import { Component, OnInit } from '@angular/core';
import { AfttClubTeamModel } from './model/aftt-team.model';
import { AfttAllDataEntity } from './model/aftt/aftt-all-data.entity';
import { AdminService } from '../services/admin.service';
import { AfttDivisionCategoryEntity } from './model/aftt/aftt-division-category.entity';
import { AfttTeamEntity } from './model/aftt/aftt-team.entity';
import { AfttDivisionEntity } from './model/aftt/aftt-division.entity';
import { AfttMemberByCategoryEntity } from './model/aftt/aftt-member-by-category.entity';

@Component({
  selector: 'app-interclubs',
  templateUrl: './interclubs.component.html',
  styleUrls: ['./interclubs.component.scss']
})
export class InterclubsComponent implements OnInit {

/*   afttClubMessieursTeamModel: AfttClubTeamModel=null;
  afttClubDamesTeamModel: AfttClubTeamModel=null;
  afttClubAineesTeamModel: AfttClubTeamModel=null;
  afttClubVeteransTeamModel: AfttClubTeamModel=null;
  afttClubJeunesTeamModel: AfttClubTeamModel=null; */

  afttSyncInfo: AfttAllDataEntity=null;
  afttDivisionCategories: Array<AfttDivisionCategoryEntity>=null;

  afttTeams: Array<AfttTeamEntity>=null;
  afttDivisions: Array<AfttDivisionEntity>=null;
  afttMembers: Array<AfttMemberByCategoryEntity>=null;

  synchronizing=false;

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
  }

/*   onReceiveTeams(type: number, event)
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

  onSynchroniseNow()
  {
    this.synchronizing = true;
    
    this.adminService.synchronizeNow()
      .subscribe(
        res => {
          this.adminService.processSyncData()
            .subscribe(
              sync => this.loadData(),
              err => console.error('Processing sync error !', err),
              () => this.synchronizing=false
            );
        },
        err => {
          console.error('synchronize error !', err);
          this.synchronizing=false;
        }
      );
      

      /*
    this.adminService.synchronizeNow()
      .subscribe(
        res => {
          console.log('sync', res);
        },
        err => {
          console.error('synchronize error !', err);
          
        },
        () => this.synchronizing=false
      );
      */
  }

  onProcessNow()
  {
    this.synchronizing = true;
    /*
    this.adminService.synchronizeNow()
      .subscribe(
        res => {
          this.adminService.processSyncData()
            .subscribe(
              sync => this.loadData(),
              err => console.error('Processing sync error !', err),
              () => this.synchronizing=false
            );
        },
        err => {
          console.error('synchronize error !', err);
          this.synchronizing=false;
        }
      );
    */
    this.adminService.processSyncData()
          .subscribe(
            sync => this.loadData(),
            err => console.error('Processing sync error !', err),
            () => this.synchronizing=false
          );
  }

}
