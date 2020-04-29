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
import { AfttMatchTypeEntity } from './model/aftt/aftt-match-type.model';

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

  afttMatchTypes: Array<AfttMatchTypeEntity> = null;
  
  importingInterclubsCategories=false;
  showable=false;

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

      this.adminService.getAfttMatchTypes()
        .subscribe( matchTypes => {
          this.afttMatchTypes = matchTypes;
          this.showable=true;
        } 
    );
      
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
          console.log('Interclub categories:', res);
          this.toastMessageService.addSuccess('Importation données AFFT', 'Les catégories interclubs de l\'AFTT ont été importées', 5000);
        }
        ,
        err => {
          this.toastMessageService.addError('Importation données AFFT', 'Une erreur s\'est produite lors de l\'importation:'+err.message);

          console.error(err);
        }
      );
  }

  onImportInterclubsSemainesAfttToClub()
  {
    this.toastMessageService.addWarn('Importation données AFFT', 'Importation des semaines interclubs de l\'AFTT en cours...');
    this.adminService.importInterclubsSemainesAfttToClub()
      .subscribe(
        res => {
          console.log('Interclub semaines:', res);
          this.toastMessageService.addSuccess('Importation données AFFT', 'Les semaines interclubs de l\'AFTT ont été importées', 5000);
        }
        ,
        err => {
          this.toastMessageService.addError('Importation données AFFT', 'Une erreur s\'est produite lors de l\'importation:'+err.message);

          console.error(err);
        }
      );
  }
  

  onImportInterclubsDivisionsAfttToClub()
  {
    this.toastMessageService.addWarn('Importation données AFFT', 'Importation des divisions interclubs de l\'AFTT en cours...');
    this.adminService.importInterclubsDivisionsAfttToClub()
      .subscribe(
        res => {
          console.log('Interclub divisions:', res);
          this.toastMessageService.addSuccess('Importation données AFFT', 'Les divisions interclubs de l\'AFTT ont été importées', 5000);
        }
        ,
        err => {
          this.toastMessageService.addError('Importation données AFFT', 'Une erreur s\'est produite lors de l\'importation:'+err.message);

          console.error(err);
        }
      );
  }

  onImportInterclubsTeamsAfttToClub()
  {
    this.toastMessageService.addWarn('Importation données AFFT', 'Importation des équipes interclubs de l\'AFTT en cours...');
    this.adminService.importInterclubsTeamsAfttToClub()
      .subscribe(
        res => {
          console.log('Interclub équipes:', res);
          this.toastMessageService.addSuccess('Importation données AFFT', 'Les équipes interclubs de l\'AFTT ont été importées', 5000);
        }
        ,
        err => {
          this.toastMessageService.addError('Importation données AFFT', 'Une erreur s\'est produite lors de l\'importation:'+err.message);

          console.error(err);
        }
      );
  }


  onImportInterclubsMatchesAfttToClub()
  {
    this.toastMessageService.addWarn('Importation données AFFT', 'Importation des matches interclubs de l\'AFTT en cours...');
    this.adminService.importInterclubsMatchesAfttToClub()
      .subscribe(
        res => {
          console.log('Interclub matches:', res);
          this.toastMessageService.addSuccess('Importation données AFFT', 'Les matches interclubs de l\'AFTT ont été importées', 5000);
        }
        ,
        err => {
          this.toastMessageService.addError('Importation données AFFT', 'Une erreur s\'est produite lors de l\'importation:'+err.message);

          console.error(err);
        }
      );
  }


  onImportInterclubsListesDesForcesAfttToClub()
  {
    this.toastMessageService.addWarn('Importation données AFFT', 'Importation des listes des forces interclubs de l\'AFTT en cours...');
    this.adminService.importInterclubsListesDesForcesAfttToClub()
      .subscribe(
        res => {
          console.log('Interclub listes des forces:', res);
          this.toastMessageService.addSuccess('Importation données AFFT', 'Les listes des forces de l\'AFTT ont été importées', 5000);
        }
        ,
        err => {
          this.toastMessageService.addError('Importation données AFFT', 'Une erreur s\'est produite lors de l\'importation:'+err.message);

          console.error(err);
        }
      );
  }
}
