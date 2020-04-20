import { Component, OnInit, Input } from '@angular/core';
import { AuthGroupModel } from '../../../auth/model/auth-group.model';
import { AuthRoleModel } from '../../../auth/model/auth-role.model';
import { AuthGroupRoleModel } from '../../../auth/model/auth-group-role.model';

@Component({
  selector: 'app-admin-group-role',
  templateUrl: './group-role.component.html',
  styleUrls: ['./group-role.component.scss']
})
export class GroupRoleComponent implements OnInit {

  @Input()
  groups: Array<AuthGroupModel>;
  
  @Input()
  roles: Array<AuthRoleModel>;
  
  @Input()
  groupRoles: Array<AuthGroupRoleModel>;
  
  constructor() { }

  ngOnInit(): void 
  {
  }

  getRoleForGroup(group: AuthGroupModel): Array<AuthRoleModel>
  {
    const grs = this.groupRoles.filter( gr => gr.authGroupId === group.id );

    const rList = new Array<AuthRoleModel>();

    for(const g of grs)
    {
      rList.push(
        this.roles.find( r => r.id === g.authRoleId)
      );
    }

    if(rList.length>0)
    {
      rList.sort( (r1, r2) => {
        if (r1.role < r2.role) return -1;
        if (r1.role > r2.role) return +1;
        return 0;
      }  );
    }

    return rList;
  }
}
