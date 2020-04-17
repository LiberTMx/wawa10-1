import { Component, OnInit, Input } from '@angular/core';
import { AfttDivisionCategoryEntity } from '../model/aftt/aftt-division-category.entity';
import { AfttAllDataEntity } from '../model/aftt/aftt-all-data.entity';
import { AfttWeekByCategory } from '../model/aftt/aftt-week-by-category.entity';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-semaines',
  templateUrl: './semaines.component.html',
  styleUrls: ['./semaines.component.scss']
})
export class SemainesComponent implements OnInit {

  @Input()
  afttDivisionCategories: Array<AfttDivisionCategoryEntity>;
  
  @Input()
  afttSyncInfo: AfttAllDataEntity;
  
  @Input()
  weeks: Array<AfttWeekByCategory>;
  
  constructor(
    // private adminService: AdminService,
  ) { }

  ngOnInit(): void 
  {
    //this.adminService.getAfttWeeks(this.afttSyncInfo.id)
    //  .subscribe( res => this.weeks = res );
  }

  getFilteredWeeksByCategory(category: AfttDivisionCategoryEntity)
  {
    const wk = this.weeks.filter( t => t.divisionCategoryId===category.playercategory );
    wk.sort( (a,b) => {
      if(a.weekName < b.weekName) return -1;
      if (a.weekName > b.weekName) return 1;
      return 0;
    });
    return wk;
  }

}
