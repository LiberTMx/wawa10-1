import { Component, OnInit, Input } from '@angular/core';
import { AfttMemberByCategoryEntity } from '../model/aftt/aftt-member-by-category.entity';

@Component({
  selector: 'app-admin-listesdesforces-by-category',
  templateUrl: './listesdesforces-by-category.component.html',
  styleUrls: ['./listesdesforces-by-category.component.scss']
})
export class ListesdesforcesByCategoryComponent implements OnInit {

  @Input()
  afttMembers: Array<AfttMemberByCategoryEntity>;
  
  constructor() { }

  ngOnInit(): void {
  }

}
