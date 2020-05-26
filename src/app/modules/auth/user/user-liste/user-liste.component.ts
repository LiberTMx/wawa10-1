import { Component, OnInit } from '@angular/core';
import { AuthUserModel } from '../../model/auth-user.model';
import { AuthService } from '../../services/auth.service';
import { AuthenticatedUserModel } from '../../model/authenticated-user.model';

import { faCircle, faFlag } from '@fortawesome/free-solid-svg-icons';
import { FormGroup } from '@angular/forms';
import { KvpModel } from '../../../../common/model/kvp.model';
import { AuthFonctionModel } from '../../model/auth-fonction.model';
import { AuthGroupModel } from '../../model/auth-group.model';

import * as moment from 'moment';
import { DialogService } from '../../../../common/services/dialog.service';
import { Observable } from 'rxjs';
import { ToastMessageService } from '../../../../common/services/toast-message.service';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-user-liste',
  templateUrl: './user-liste.component.html',
  styleUrls: ['./user-liste.component.scss']
})
export class UserListeComponent implements OnInit {

  faCircle=faCircle;
  faFlag=faFlag;

  users: Array<AuthUserModel>=null;
  
  currentUser: AuthenticatedUserModel=null;
  
  isUserClubAdmin=false;

  selectedUser: AuthUserModel=null;

  showMode = 0;
  includeDeletedItems=false;

  constructor(
    private authService: AuthService,
    private dialogService: DialogService,
    private toastMessageService: ToastMessageService,
  ) 
  {
    moment.locale('fr');
  }

  ngOnInit(): void 
  {
    this.authService.getUserList(this.includeDeletedItems)
      .subscribe(
        users => {
            this.users=users;
            this.onSortByNom();
            console.log('users', users);
          }
      );

    
    this.currentUser = this.authService.getCurrentUser();
    console.log('connected user:', this.currentUser);

    this.isUserClubAdmin=this.authService.isUserClubAdmin();
  }

  getColor(user: AuthUserModel): string
  {
    return user.deletedAt!==null ? 'red' : 'black';
  }

  onShowListe()
  {
    this.showMode=0;
    // comment scrollervers la bonne ligne de la table?
  }

  onEditUser(user: AuthUserModel)
  {
    this.selectedUser=user;
    console.log('editing user:', user);
    this.showMode=1;
  }

  onSortByNom()
  {
    this.users.sort( (u1,u2) => {
      if(u1.nom.toUpperCase() < u2.nom.toUpperCase()) return -1;
      if(u1.nom.toUpperCase() > u2.nom.toUpperCase()) return +1;
      //return 0;
      if(u1.prenom.toUpperCase() < u2.prenom.toUpperCase()) return -1;
      if(u1.prenom.toUpperCase() > u2.prenom.toUpperCase()) return +1;
      return 0;
    }  );
    
  }

  onSortByPrenom()
  {
    this.users.sort( (u1,u2) => {
      if(u1.prenom.toUpperCase() < u2.prenom.toUpperCase()) return -1;
      if(u1.prenom.toUpperCase() > u2.prenom.toUpperCase()) return +1;
      return 0;
    }  );
  }

  onSortByLicence()
  {
    this.users.sort( (u1,u2) => {
      if(u1.licence < u2.licence) return -1;
      if(u1.licence > u2.licence) return +1;
      return 0;
    }  );
  }

  onDeleteUser(user: AuthUserModel)
  {
    if(user.deletedAt===null)
    {
      this.confirmDeleteUser(user)
      .subscribe(res => {
        if(res===true) this.doDeleteUser(user);
      });
    }
    else
    {
      this.confirmDeletePermanentlyMembre(user)
      .subscribe(res => {
        if(res===true) this.doDeletePermanentlyUser(user);
      });
    }
  }

  confirmDeleteUser(user: AuthUserModel): Observable<boolean> 
  {
    const title = 'Confirmation';
    const message = 'Voulez-vous vraiment supprimer ce membre/utilisateur ? - '+ user.prenom+' '+user.nom+' ('+user.username+')';
    return this.dialogService.confirm(title, message);
  }

  confirmDeletePermanentlyMembre(user: AuthUserModel): Observable<boolean> 
  {
    const title = 'Confirmation';
    const message = 'Voulez-vous vraiment supprimer ce membre/utilisateur DEFINITIVEMENT ? - '+ user.prenom+' '+user.nom+' ('+user.username+')';
    return this.dialogService.confirm(title, message);
  }

  doDeleteUser(user: AuthUserModel)
  {
    this.authService.deleteUserLogically(user)
      .subscribe(
        res => {
          if(this.includeDeletedItems)
          {
            user.deletedAt=new Date();
            this.users=this.users.filter( u => u.id !== user.id ? u : user);
          }
          else
          {
            this.users=this.users.filter( u => u.id !== user.id);
          }

          this.toastMessageService.addSuccess('Suppression utilisateur', 
              'Un utilisateur a été supprimé: '+user.nom+' '+user.prenom+', '+user.username, 5000);
        }
      );
  }

  doDeletePermanentlyUser(user: AuthUserModel)
  {
    this.authService.deleteUserPermanently(user)
      .subscribe(
        res => {
          this.users=this.users.filter( u => u.id !== user.id);
          this.toastMessageService.addSuccess('Suppression definitive utilisateur', 
              'Un utilisateur a été supprimé DEFINITIVEMENT: '+user.nom+' '+user.prenom+', '+user.username, 5000);
        }
      );
  }

  onResetUserPassword(user: AuthUserModel)
  {
    this.confirmResetUserPassword(user)
    .subscribe(res => {
      if(res===true) this.doResetUserPassword(user);
    });
  }

  confirmResetUserPassword(user: AuthUserModel): Observable<boolean> 
  {
    const title = 'Confirmation';
    const message = 'Voulez-vous vraiment ré-initialiser le mot de passe de cet utilisateur ? - '
    + user.prenom+' '+user.nom+' ('+user.username+'). Nouveau pwd temporaire: newLiwaUserPwd';
    return this.dialogService.confirm(title, message);
  }

  doResetUserPassword(user: AuthUserModel)
  {
    this.authService.resetUserPassword(user)
      .subscribe(
        res => {
          //this.users=this.users.filter( u => u.id !== user.id);
          this.toastMessageService.addWarn('Mot de passe', 
              'Le mot de passe d\'Un utilisateur a été ré-initialisé: '+user.nom+' '+user.prenom+', '+user.username, 5000);
          this.replaceUserInList(user);
        }
      );
  }

  replaceUserInList(user: AuthUserModel)
  {
    //this.users = [...this.users.filter( u => u.id === user.id ? user : u )];
    /*
    let newUsers= [...this.users];
    newUsers=newUsers.filter( u => u.id === user.id ? user : u );
    Object.assign(this.users,newUsers);$$
    */
    this.users=this.users.filter( u => u.id !== user.id );
    this.users.push(user);
    this.onSortByNom();
  }

  onUserModified(user: AuthUserModel)
  {
    this.replaceUserInList(user);
    this.onShowListe();
  }

  hasEditAccess(user: AuthUserModel): boolean
  {
    if(this.currentUser===null || this.currentUser===undefined) return false;
    if(user===null || user===undefined) return false;
    if(user.deletedAt!==null) return false;
    if(this.isUserClubAdmin) return true;
    if(this.currentUser.id===user.id) return true;
    return false;
  }

  hasValidEmailAddress(user: AuthUserModel): boolean
  {
    if(user===null || user===undefined) return false;
    if(user.deletedAt!==null) return false;
    if(user.email===null || user.email===undefined || user.email==='nobody@liwa.be') return false;
    return true;
  }

  onChangeIncludeDeletedItems(event: MatCheckboxChange)
  {
    console.log('MatCheckboxChange', event.checked);
    this.users=null;
    this.includeDeletedItems=event.checked;
    this.authService.getUserList(event.checked)
      .subscribe(
        users => {
            this.users=users;
            console.log('users', users);
          }
      );
  }

  isRestorable(user: AuthUserModel): boolean
  {
    if(user===null || user===undefined) return false;
    return user.deletedAt !==null;
  }

  onReactivateUser(user: AuthUserModel)
  {
    this.confirmReactivateMembre(user)
    .subscribe(res => {
      if(res===true) this.doReactivateUser(user);
    });
  }

  confirmReactivateMembre(user: AuthUserModel): Observable<boolean> 
  {
    const title = 'Confirmation';
    const message = 'Voulez-vous vraiment réactiver ce membre/utilisateur ? - '+ user.prenom+' '+user.nom+' ('+user.username+')';
    return this.dialogService.confirm(title, message);
  }

  doReactivateUser(user: AuthUserModel)
  {
    this.authService.reactivateUser(user)
      .subscribe(
        res => {
          user.deletedAt=null;
          this.users=this.users.filter( u => u.id === user.id ? user : u );
          this.toastMessageService.addSuccess('Réactivation utilisateur', 
              'Un utilisateur a été réactivé: '+user.nom+' '+user.prenom+', '+user.username, 5000);
        }
      );
  }

  isCurrentUser(user: AuthUserModel): boolean
  {
    return user.id === this.currentUser.id;
  }
}
