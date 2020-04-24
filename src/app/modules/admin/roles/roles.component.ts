import { Component, OnInit } from '@angular/core';
import { AuthDomainModel} from '../../auth/model/auth-user.model';
import { AdminRoleService } from './services/admin-role.service';
import { AuthGroupModel } from '../../auth/model/auth-group.model';
import { AuthGroupRoleModel } from '../../auth/model/auth-group-role.model';
import { AuthRoleModel } from '../../auth/model/auth-role.model';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  domains: Array<AuthDomainModel>;
  groups: Array<AuthGroupModel>;
  roles: Array<AuthRoleModel>;
  
  groupRoles: Array<AuthGroupRoleModel>;
  
  constructor(
    private adminRoleService: AdminRoleService,
  ) { }

  ngOnInit(): void 
  {
    this.adminRoleService.getAllDomains()
      .subscribe(res => this.domains=res);

    this.adminRoleService.getAllGroups()
      .subscribe( (res: Array<AuthGroupModel>) => {
        this.groups=res.sort( (g1, g2) => {
          if(g1.name < g2.name) return -1;
          if(g1.name > g2.name) return +1;
          return 0;
        });
      }
    );

    this.adminRoleService.getAllRoles()
      .subscribe(res => this.roles=res);

    this.adminRoleService.getAllGroupRoles()
      .subscribe(res => this.groupRoles=res);
  }

}
