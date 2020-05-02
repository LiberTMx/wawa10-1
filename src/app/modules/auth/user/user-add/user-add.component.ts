import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { KvpModel } from '../../../../common/model/kvp.model';
import { ListeService } from '../../../../common/services/liste.service';
import { AuthFonctionModel } from '../../model/auth-fonction.model';
import { FonctionService } from '../../services/fonction.service';
import { MatSelectChange } from '@angular/material/select';
import { AuthGroupRoleModel } from '../../model/auth-group-role.model';
import { AdminRoleService } from '../../../admin/roles/services/admin-role.service';
import { AuthGroupModel } from '../../model/auth-group.model';
import { AuthService } from '../../services/auth.service';
import { MDBDatePickerComponent, IMyOptions, LocaleService } from 'ng-uikit-pro-standard';
import * as moment from 'moment';
import { mdbdatepicker_locales } from '../../../../common/interfaces/mdbdatepicker.locale';
@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {

  @ViewChild('datePicker', {static: true}) datePicker: MDBDatePickerComponent;
  
  public myDatePickerOptions: IMyOptions = {
    // Your options
    };
    
  lang='fr';

  userForm: FormGroup;

  loading=false;

  sexes: Array<KvpModel>;

  // Les fonctions
  authFonctions: Array<AuthFonctionModel>=null;
  fonctions: Array<KvpModel>;
  selectedFonction: AuthFonctionModel;
  assignedFonctions: Array<AuthFonctionModel> = new Array<AuthFonctionModel>();

  // Les rôles (ou plutot group-role)
  authRoles: Array<AuthGroupModel>;
  roles: Array<KvpModel>;
  selectedRole: AuthGroupModel;
  assignedRoles: Array<AuthGroupModel> = new Array<AuthGroupModel>();

  constructor(
    private adminRoleService: AdminRoleService,
    private authService: AuthService,
    private formBuilder: FormBuilder, 
    private fonctionService: FonctionService,
    private listeService: ListeService,
    // MDB PRO Service !
    private localeService: LocaleService,
  ) 
  { 
    moment.locale('fr');
  }

  ngOnInit(): void 
  {
    //this.datePicker.addLocale(mdbdatepicker_locales);
    //this.datePicker.setLocaleOptions(mdbdatepicker_locales);
    this.localeService.setLocaleOptions(mdbdatepicker_locales);
    
    this.sexes = this.listeService.sexes();

    this.fonctionService.getAllFonctions()
      .subscribe(
        res => {
          this.authFonctions = res; 
          console.log('Liste des fonctions:', res);
          this.fonctions=this.buildFonctionsForSelect();
        }
    );

    this.adminRoleService.getAllGroups()
      .subscribe(res => {
          this.authRoles=res;
          this.roles=this.buildRolesForSelect();
        }
    );

    this.prepareForm();


  }

  buildFonctionsForSelect(): Array<KvpModel>
  { 
    const fonctions=new Array<KvpModel>();

    if(this.authFonctions!==null && this.authFonctions!==undefined)
    {
      for(const f of this.authFonctions)
      {
        fonctions.push(
          new KvpModel( f.code, f.designation)
        );
      }
    }
    return fonctions;
  }

  buildRolesForSelect(): Array<KvpModel>
  {
    const roles=new Array<KvpModel>();
    if(this.authRoles!==null && this.authRoles!==undefined)
    {
      for(const r of this.authRoles)
      {
        roles.push(
          new KvpModel( String(r.id), r.name)
        );
      }
    }
    return roles;
  }

  prepareForm()
  {
    this.userForm = this.formBuilder.group({
      nom: ['', [Validators.required, Validators.minLength(2)] ],
      prenom: ['', [Validators.required, Validators.minLength(1)] ],
      username: ['', [Validators.required, Validators.minLength(6)] ],
      email: ['', [Validators.required, Validators.minLength(3), Validators.email] ],
      dateNaissance: [''],
      gestionParentale: [''],
      rue: [''],
      numero: [''],
      boite: [''],
      codePostal: [''],
      localite: [''],
      tel: [''],
      telPrive: [''],
      gsm: [''],
      sexe: [''],
      licence: [''],
      classementH: [''],
      classementD: [''],
      comment: [''],
      commentComite: [''],
    });
  }

  onSexeChanged(event: MatSelectChange)
  {
      // this.mySexe=this.profileForm.get('f3Sexe').value;
  }
  
  onEMailInconnu()
  {
    //this.userForm.email.value='inconnu';
    this.userForm.patchValue({
      email: 'nobody@liwa.be'
    });
  }

  onFunctionChanged(event: MatSelectChange)
  {
    const code = event.value;
    this.selectedFonction = this.authFonctions.find( f => f.code === code);
    console.log('selected function',code);
    
  }

  onAddSelectedFunction()
  {
    console.log('adding function:', JSON.stringify( this.selectedFonction) );
    this.assignedFonctions.push(this.selectedFonction);
  }

  onRemoveFunction(f: AuthFonctionModel)
  {
    console.log('removing function:', JSON.stringify( f ) );
    this.assignedFonctions = this.assignedFonctions.filter( af => af.id !== f.id);
  }


  onRoleChanged(event: MatSelectChange)
  {
    const id = event.value;
    this.selectedRole = this.authRoles.find( r => (+r.id) === (+id) );
  }

  onAddSelectedRole()
  {
    this.assignedRoles.push(this.selectedRole);
  }

  onRemoveRole(r: AuthGroupModel)
  {
    this.assignedRoles = this.assignedRoles.filter( ar => ar.id !== r.id);
  }

  onCreateUser()
  {
    this.authService.createUser(this.userForm.value, this.assignedFonctions, this.assignedRoles)
      .subscribe();
  }
}
