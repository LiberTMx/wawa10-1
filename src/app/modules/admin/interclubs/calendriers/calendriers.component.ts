import { Component, OnInit, Input } from '@angular/core';
import { AfttDivisionCategoryEntity } from '../model/aftt/aftt-division-category.entity';
import { AfttAllDataEntity } from '../model/aftt/aftt-all-data.entity';
import { AfttMatchEntity } from '../model/aftt/aftt-match.entity';
import { AdminService } from '../../services/admin.service';
import { AfttWeekByCategory } from '../model/aftt/aftt-week-by-category.entity';
import { AfttTeamEntity } from '../model/aftt/aftt-team.entity';

@Component({
  selector: 'app-admin-calendriers',
  templateUrl: './calendriers.component.html',
  styleUrls: ['./calendriers.component.scss']
})
export class CalendriersComponent implements OnInit {

  @Input()
  afttDivisionCategories: Array<AfttDivisionCategoryEntity>;
  
  @Input()
  afttSyncInfo: AfttAllDataEntity;

  @Input()
  afttWeekByCategory: Array<AfttWeekByCategory>=null;
  
  @Input()
  afttTeams: Array<AfttTeamEntity>;
  
  afttMatches: Array<AfttMatchEntity>=null;

  constructor(
    private adminService: AdminService,
  ) { }

  ngOnInit(): void 
  {
    this.adminService.getAfttMatches(this.afttSyncInfo.id)
        .subscribe( matches => {
          this.afttMatches = matches;
          console.log('matches', matches);
        } 
      );
  }

  getFilteredTeamsByCategory(category: AfttDivisionCategoryEntity): Array<AfttTeamEntity>
  {
    const teams = this.afttTeams.filter( t => t.DivisionCategory===category.playercategory  );
    teams.sort( (t1, t2) => {
      if(t1.Team < t2.Team) return -1;
      if(t1.Team > t2.Team) return +1;
      return 0;
    });
    return teams;
  }

  getFilteredWeeksByCategory(category: AfttDivisionCategoryEntity): Array<AfttWeekByCategory>
  {
    const weeks = this.afttWeekByCategory.filter( t => t.divisionCategoryId===category.playercategory );
    weeks.sort( (w1, w2) => {
      if(w1.weekName < w2.weekName) return -1;
      if(w1.weekName > w2.weekName) return +1;
      return 0;
    });
    return weeks;
  }  

  getFilteredMatchesByCategory(category: AfttDivisionCategoryEntity): Array<AfttMatchEntity>
  {
    return this.afttMatches.filter( t => (+t.DivisionCategory)===(+category.playercategory) );
    //return this.afttMatches;
  } 

}
