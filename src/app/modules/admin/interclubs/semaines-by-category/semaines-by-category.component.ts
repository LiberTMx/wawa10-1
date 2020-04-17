import { Component, OnInit, Input } from '@angular/core';
import { AfttDivisionCategoryEntity } from '../model/aftt/aftt-division-category.entity';
import { AdminService } from '../../services/admin.service';
import { AfttWeekByCategory } from '../model/aftt/aftt-week-by-category.entity';

@Component({
  selector: 'app-admin-semaines-by-category',
  templateUrl: './semaines-by-category.component.html',
  styleUrls: ['./semaines-by-category.component.scss']
})
export class SemainesByCategoryComponent implements OnInit {

  @Input()
  afttDivisionCategory: Array<AfttDivisionCategoryEntity>;

  @Input()
  weeks: Array<AfttWeekByCategory>;
  
  constructor(
    private adminService: AdminService,
  ) { }

  ngOnInit(): void {
  }

}
