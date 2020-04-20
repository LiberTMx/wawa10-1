import { Component, OnInit, Input } from '@angular/core';
import { AuthDomainModel } from '../../../auth/model/auth-user.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminRoleService } from '../services/admin-role.service';
import { AuthRoleModel } from '../../../auth/model/auth-role.model';

@Component({
  selector: 'app-admin-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {

  @Input()
  domains: Array<AuthDomainModel>;
  
  @Input()
  roles: Array<AuthRoleModel>;

  domainsSelect /*: [{value: string, label: string}]*/=new Array<{value: number, label: string}>();

  roleForm: FormGroup;

  constructor(
    private adminRoleService: AdminRoleService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void 
  {
    this.prepareForm();

    const select = new Array<{value: number, label: string}>();
    for(const d of this.domains)
    {
      select.push( {value: d.id, label: d.domain});
    }
    this.domainsSelect=select;
  }

  prepareForm()
  {
    this.roleForm = this.formBuilder.group({
      domain: ['', [Validators.required, Validators.minLength(3)] ],
      role: ['', [Validators.required, Validators.minLength(5)] ],
    });
  }

  get domain() { return this.roleForm.get('domain'); }
  get role() { return this.roleForm.get('role'); }

  onCreateRole()
  {
    const formValue=this.roleForm.value;
    console.log('Creating new role', formValue.domain, formValue.role);

    /*
    this.fonctionService.createNewFonction(formValue.code.toUpperCase(), formValue.designation, formValue.description)
      .subscribe( (res: AuthFonctionModel) => {
        if(res!==null && res!==undefined)
        {
          this.fonctionForm.reset();
          let newFonctions = new Array<AuthFonctionModel>();
          Object.assign(newFonctions, this.authFonctions);
          newFonctions.push(res);
          newFonctions = newFonctions.sort( (d1, d2) => {
            if(d1.code < d2.code) return -1;
            if(d1.code > d2.code) return 1;
            return 0;
          });
          this.authFonctions=newFonctions;
          // this.domainEvent.emit( {eventName: 'DOMAIN_ADDED', domains: this.domains} );
        }
      });
    */
  }

  getRoleForDomain(domain: AuthDomainModel): Array<AuthRoleModel>
  {
    const roles = this.roles.filter( r => r.authDomain.id === domain.id);
    roles.sort( (r1, r2) => {
      if (r1.role < r2.role) return -1;
      if (r1.role > r2.role) return +1;
      return 0;
    }  );
    return roles;
  }

}
