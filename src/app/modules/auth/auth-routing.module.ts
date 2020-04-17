import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UserListeComponent } from './user/user-liste/user-liste.component';


// const routes: Routes = [];

export const AUTH_ROUTES: Routes =
[
    { path: 'auth',  children: [
        { path: 'login/:redirectUrl', component: LoginComponent },
        { path: 'login', component: LoginComponent },
        { path: 'changePassword', component: ChangePasswordComponent }
      ] 
    },
    { path: 'user',  children: [
      { path: 'liste', component: UserListeComponent },
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(AUTH_ROUTES)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
