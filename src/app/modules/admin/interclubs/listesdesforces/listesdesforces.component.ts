import { Component, OnInit, Input } from '@angular/core';
import { AfttDivisionCategoryEntity } from '../model/aftt/aftt-division-category.entity';
import { AfttMemberByCategoryEntity } from '../model/aftt/aftt-member-by-category.entity';

@Component({
  selector: 'app-admin-listesdesforces',
  templateUrl: './listesdesforces.component.html',
  styleUrls: ['./listesdesforces.component.scss']
})
export class ListesdesforcesComponent implements OnInit {

  @Input()
  afttDivisionCategories: Array<AfttDivisionCategoryEntity>;
  
  @Input()
  afttMembers: Array<AfttMemberByCategoryEntity>;
  
  constructor() { }

  ngOnInit(): void 
  {
    //console.log('aftt members', this.afttMembers);
  }

  getFilteredMembersByCategory(category: AfttDivisionCategoryEntity)
  {
    let members: Array<AfttMemberByCategoryEntity> = this.afttMembers.filter( t => t.divisionCategory===category.playercategory );
    // il faut trier par position
    members=members.sort( (t1, t2) => {
      if(t1.Position<t2.Position) return -1;
      if(t1.Position>t2.Position) return 1;
      return 0;
    });
    return members;
  }

}
