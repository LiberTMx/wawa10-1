import { Component, OnInit, Input } from '@angular/core';
import { AfttDivisionEntity } from '../model/aftt/aftt-division.entity';
import { AfttDivisionCategoryEntity } from '../model/aftt/aftt-division-category.entity';

@Component({
  selector: 'app-admin-divisions',
  templateUrl: './divisions.component.html',
  styleUrls: ['./divisions.component.scss']
})
export class DivisionsComponent implements OnInit {

  @Input()
  afttDivisionCategories: Array<AfttDivisionCategoryEntity>;
  
  @Input()
  afttDivisions: Array<AfttDivisionEntity>;
  
  constructor() { }

  ngOnInit(): void {
  }

  getFilteredDivisionsByCategory(category: AfttDivisionCategoryEntity)
  {
    return this.afttDivisions.filter( t => t.DivisionCategory===category.playercategory );
  }
}
