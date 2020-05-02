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
  
  constructor(
    private authService: AuthService,
  ) 
  {
    moment.locale('fr');
  }

  ngOnInit(): void 
  {
    this.authService.getUserList()
      .subscribe(
        users => {
            this.users=users;
            console.log('users', users);
          }
      );

    
    this.currentUser = this.authService.getCurrentUser();
    this.isUserClubAdmin=this.authService.isUserClubAdmin();
  }

  onShowListe()
  {
    this.showMode=0;
    // comment scrollervers la bonne ligne de la table?
  }

  onEditUser(user: AuthUserModel)
  {
    this.selectedUser=user;
    this.showMode=1;
  }

  onSortByNom()
  {
    this.users.sort( (u1,u2) => {
      if(u1.nom < u2.nom) return -1;
      if(u1.nom > u2.nom) return +1;
      //return 0;
      if(u1.prenom < u2.prenom) return -1;
      if(u1.prenom > u2.prenom) return +1;
      return 0;
    }  );
    
  }

  onSortByPrenom()
  {
    this.users.sort( (u1,u2) => {
      if(u1.prenom < u2.prenom) return -1;
      if(u1.prenom > u2.prenom) return +1;
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

  }
}
