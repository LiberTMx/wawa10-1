import { Component, OnInit, Input } from '@angular/core';
import { AfttDivisionEntity } from '../model/aftt/aftt-division.entity';

@Component({
  selector: 'app-divisions-by-category',
  templateUrl: './divisions-by-category.component.html',
  styleUrls: ['./divisions-by-category.component.scss']
})
export class DivisionsByCategoryComponent implements OnInit {

  @Input()
  afttDivisions: Array<AfttDivisionEntity>;
  
  constructor() { }

  ngOnInit(): void {
  }

}
