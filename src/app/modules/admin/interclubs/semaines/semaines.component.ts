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
  
  weeks: Array<AfttWeekByCategory>=null;
  
  constructor(
    private adminService: AdminService,
  ) { }

  ngOnInit(): void {
  }

}
