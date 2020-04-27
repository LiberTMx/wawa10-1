import { Component, OnInit } from '@angular/core';
import { AfttClubTeamModel } from './model/aftt-team.model';
import { AfttAllDataEntity } from './model/aftt/aftt-all-data.entity';
import { AdminService } from '../services/admin.service';
import { AfttDivisionCategoryEntity } from './model/aftt/aftt-division-category.entity';
import { AfttTeamEntity } from './model/aftt/aftt-team.entity';
import { AfttDivisionEntity } from './model/aftt/aftt-division.entity';
import { AfttMemberByCategoryEntity } from './model/aftt/aftt-member-by-category.entity';
import { AfttWeekByCategory } from './model/aftt/aftt-week-by-category.entity';
import { ToastMessageService } from '../../../common/services/toast-message.service';

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

 
  afttWeekByCategory: Array<AfttWeekByCategory>=null;

  importingInterclubsCategories=false;

  constructor(
    private adminService: AdminService,
    private toastMessageService: ToastMessageService,
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

      this.adminService.getAfttWeeks(this.afttSyncInfo.id)
        .subscribe( weeks => this.afttWeekByCategory = weeks );

        
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

  onImportInterclubsCategoriesAfttToClub()
  {
    this.toastMessageService.addWarn('Importation données AFFT', 'Importation des catégories interclubs de l\'AFTT en cours...');
    this.adminService.importInterclubsCategoriesAfttToClub()
      .subscribe(
        res => {
          this.toastMessageService.addSuccess('Importation données AFFT', 'Les catégories interclubs de l\'AFTT ont été importées');
        }
        ,
        err => {
          this.toastMessageService.addError('Importation données AFFT', 'Une erreur s\'est produite lors de l\'importation:'+err.message);

          console.error(err);
        }
      );
  }
  

}
