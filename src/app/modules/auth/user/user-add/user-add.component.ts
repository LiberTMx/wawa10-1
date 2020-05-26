import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { KvpModel } from '../../../../common/model/kvp.model';
import { ListeService } from '../../../../common/services/liste.service';
import { AuthFonctionModel } from '../../model/auth-fonction.model';
import { FonctionService } from '../../services/fonction.service';
import { MatSelectChange } from '@angular/material/select';
import { AdminRoleService } from '../../../admin/roles/services/admin-role.service';
import { AuthGroupModel } from '../../model/auth-group.model';
import { AuthService } from '../../services/auth.service';
import { MDBDatePickerComponent, IMyOptions, LocaleService } from 'ng-uikit-pro-standard';
import * as moment from 'moment';
import { mdbdatepicker_locales } from '../../../../common/interfaces/mdbdatepicker.locale';
import { ToastMessageService } from '../../../../common/services/toast-message.service';
import { AppUtils } from '../../../../common/utils/AppUtils';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {

  @ViewChild('datePicker', {static: true}) datePicker: MDBDatePickerComponent;
  
  dnn: any;
    
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


  dateNaissanceValid=true;

  constructor(
    private adminRoleService: AdminRoleService,
    private authService: AuthService,
    private formBuilder: FormBuilder, 
    private fonctionService: FonctionService,
    private listeService: ListeService,
    // MDB PRO Service !
    private localeService: LocaleService,
    //
    private toastMessageService: ToastMessageService,
    //
  ) 
  { 
    moment.locale('fr');
  }
  
/*   static dateNaissanceValidator(form: FormGroup, datePipe)
  {
      const dateNaissanceFieldValue = form.get('dateNaissance').value;
      const dateNaissance= this.datePipe.transform(dateNaissanceFieldValue, 'dd/MM/yyyy');
      if(dateNaissance===null || dateNaissance===undefined) return null;

      const today=new Date();
      if(dateNaissance>= today) return { error: true };
      const nbDays = AppUtils.diffInDaysBetweenDates(dateNaissance, today);
      if(nbDays<0) return null;
      if (nbDays < 365 * 3 ) return { error: true };
      return null;
  } */

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
      username: ['', [Validators.required, Validators.minLength(3)] ],
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
      isStageParticipantDiscret: [''],
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
    const alreadyPresent=this.assignedFonctions.find( f => f.id === this.selectedFonction.id);
    if(alreadyPresent===null || alreadyPresent===undefined)
    {
      this.assignedFonctions.push(this.selectedFonction);
    }
    else
    {
      this.toastMessageService.addWarn('Ajouter une fonction', 'La fonction sélectionnée est déjà présente !');
    }
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
    const alreadyPresent=this.assignedRoles.find( r => r.id === this.selectedRole.id);
    if(alreadyPresent===null || alreadyPresent===undefined)
    {
      this.assignedRoles.push(this.selectedRole);
    }
    else
    {
      this.toastMessageService.addWarn('Ajouter un rôle', 'Le rôle sélectionné est déjà présent !');
    }
  }

  onRemoveRole(r: AuthGroupModel)
  {
    this.assignedRoles = this.assignedRoles.filter( ar => ar.id !== r.id);
  }

  isStageParticipant(): boolean
  {
    if(this.assignedRoles===null || this.assignedRoles===undefined) return false;
    for(const r of this.assignedRoles)
    {
      if(r.name==='stage_participant') return true;
    }
    return false;
  }

  onCreateUser()
  {
    // faut valider la date de naissance
    const dateNaissanceFieldValue = this.userForm.get('dateNaissance').value;
    
    this.dateNaissanceValid=true;
    //const dateNaissance: Date= this.datePipe.transform(dateNaissanceFieldValue, 'dd/MM/yyyy');
    if(dateNaissanceFieldValue===null || dateNaissanceFieldValue===undefined) 
    {
      // nothing to do
    }
    else
    {
      //const dateNaissance: Date=moment(dateNaissanceFieldValue, 'dd/MM/yyyy').toDate();//.format('dd/MM/yyyy');
      // 16/09/1962
      const year = +dateNaissanceFieldValue.substr(6, 4);
      const month = (+dateNaissanceFieldValue.substr(3, 2) ) - 1;
      const day = +dateNaissanceFieldValue.substr(0, 2);
      const dateNaissance = new Date(year, month, day);
      const today=new Date(); 
      if(dateNaissance>= today) 
      {
        this.dateNaissanceValid=false;
        this.toastMessageService.addError('Date de naissance', 'La date de naissance ne peut pas être dans le futur !');
        return;
      }

      const nbDays = AppUtils.diffInDaysBetweenDates(dateNaissance, today);
      if(nbDays<0) return null;
      if (nbDays < 365 * 3 ) 
      {
        this.dateNaissanceValid=false;
        this.toastMessageService.addError('Date de naissance', 'La date de naissance doit représenter un âge de minimum 3 ans !');
        return;
      }
    }

   
    

    /////////////////////////////////////////////////////////////////////////////////////////////////////////

    this.authService.createUser(this.userForm.value, this.assignedFonctions, this.assignedRoles)
      .subscribe(
        user => {
          // Ok utilisateur créé
          this.toastMessageService.addSuccess('Création utilisateur', 'Un utilisateur a été créé: '+user.nom+' '+user.prenom+', '+user.username, 5000);
          this.onClearForm();
        }
        ,
        err => {
          console.error('erreur creation user', err);
          this.toastMessageService.addError('Création utilisateur', 'Une erreur s\'est produite:'+err.message, 10000);
          if(err.error)
          {
            this.toastMessageService.addError('Création utilisateur', 'Une erreur s\'est produite:'+err.error.message, 11000);
          }
        }
      );
  }

  onClearForm()
  {
    this.userForm.reset();
    
    this.userForm.patchValue({
      dateNaissance: null
    });
    
    //this.datePicker.s
    //this.datePicker.selectDate(null);
    this.userForm.controls.dateNaissance.setValue('');
    this.assignedFonctions.length=0;
    this.assignedRoles.length=0;
  }
}
