import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UserListeComponent } from './user/user-liste/user-liste.component';
import { FonctionsComponent } from './fonctions/fonctions.component';
import { UserAddComponent } from './user/user-add/user-add.component';


// const routes: Routes = [];

export const AUTH_ROUTES: Routes =
[
    { path: 'auth',  children: [
        { path: 'login/:redirectUrl', component: LoginComponent },
        { path: 'login', component: LoginComponent },
        { path: 'changePassword', component: ChangePasswordComponent },
        { path: 'fonctions', component: FonctionsComponent },
      ] 
    },
    { path: 'user',  children: [
      { path: 'liste', component: UserListeComponent },
      { path: 'add', component: UserAddComponent },
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(AUTH_ROUTES)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
