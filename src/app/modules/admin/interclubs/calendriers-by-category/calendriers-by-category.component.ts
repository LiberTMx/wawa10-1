import { Component, OnInit, Input } from '@angular/core';
import { AfttDivisionCategoryEntity } from '../model/aftt/aftt-division-category.entity';

@Component({
  selector: 'app-admin-calendriers-by-category',
  templateUrl: './calendriers-by-category.component.html',
  styleUrls: ['./calendriers-by-category.component.scss']
})
export class CalendriersByCategoryComponent implements OnInit {

  @Input()
  afttDivisionCategory: Array<AfttDivisionCategoryEntity>;

  constructor() { }

  ngOnInit(): void {
  }

}
