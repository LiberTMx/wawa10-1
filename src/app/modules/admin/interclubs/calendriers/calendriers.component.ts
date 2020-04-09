import { Component, OnInit, Input } from '@angular/core';
import { AfttDivisionCategoryEntity } from '../model/aftt/aftt-division-category.entity';
import { AfttAllDataEntity } from '../model/aftt/aftt-all-data.entity';

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

  constructor() { }

  ngOnInit(): void {
  }

}
