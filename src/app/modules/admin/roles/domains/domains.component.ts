import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthDomainModel } from '../../../auth/model/auth-user.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AdminRoleService } from '../services/admin-role.service';

export class DomainEvent
{
  eventName: string;
  domains?: Array<AuthDomainModel>;
}

@Component({
  selector: 'app-admin-domaines',
  templateUrl: './domains.component.html',
  styleUrls: ['./domains.component.scss']
})
export class DomainsComponent implements OnInit {

  @Input()
  domains: Array<AuthDomainModel>;
  
  @Output()
  domainEvent = new EventEmitter<DomainEvent>();
  
  domainForm: FormGroup;

  constructor(
    private adminRoleService: AdminRoleService,
    private formBuilder: FormBuilder, 
  ) { }

  ngOnInit(): void 
  {
    this.domainForm = this.formBuilder.group({
      nom: ['', Validators.required],
      ordre: ['', Validators.required],
      commentaire: [''],
    });
  }

  onCreateDomain()
  {
    const formValue=this.domainForm.value;
    console.log('Creating new auth domain', formValue.nom, formValue.commentaire);
    this.adminRoleService.createNewDomain(formValue.nom, formValue.commentaire, formValue.ordre)
      .subscribe( (res: AuthDomainModel) => {
        if(res!==null && res!==undefined)
        {
          let newDomains = new Array<AuthDomainModel>();
          Object.assign(newDomains, this.domains);
          newDomains.push(res);
          newDomains = newDomains.sort( (d1, d2) => {
            if(d1.domain < d2.domain) return -1;
            if(d1.domain > d2.domain) return 1;
            return 0;
          });
          this.domains=newDomains;
          this.domainEvent.emit( {eventName: 'DOMAIN_ADDED', domains: this.domains} );
        }
      });
  }
}
