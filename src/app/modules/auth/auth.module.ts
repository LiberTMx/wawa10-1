import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthService } from './services/auth.service';
import { AuthGuardService as AuthGuard  } from '../auth/services/auth-guard.service';
import { PrimengModule } from '../../modules.vendors/primeng/primeng.module';
import { MaterialModule } from '../../modules.vendors/google.angular.material/material.module';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './state/reducers/auth.reducer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginComponent } from './login/login.component';
import { MdBootstrapProModule } from '../../modules.vendors/mdbootstrap/md-bootstrap-pro.module';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';
import { UserListeComponent } from './user/user-liste/user-liste.component';
import { FonctionsComponent } from './fonctions/fonctions.component';
import { FonctionService } from './services/fonction.service';
import { UserAddComponent } from './user/user-add/user-add.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
//import { ComTranslateModule } from '../../modules.vendors/com.translate/com.translate.module';
import { IconsModule } from 'ng-uikit-pro-standard';

@NgModule({
  declarations: [
    LoginComponent,
    ChangePasswordComponent,
    UserListeComponent,
    FonctionsComponent,
    UserAddComponent,
    UserEditComponent,
  ],
  imports: [
    CommonModule,
    IconsModule,
    PasswordStrengthMeterModule,
    AuthRoutingModule,
    // ComTranslateModule,
    MaterialModule,
    PrimengModule,
    MdBootstrapProModule,

    StoreModule.forFeature('authModule', authReducer ),

    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
  ],
  exports: [
    AuthRoutingModule,
    LoginComponent,
  ],
  providers: [
    AuthService,
    FonctionService,
    AuthGuard,
  ]
})
export class AuthModule {
  /*
  static forRoot(): ModuleWithProviders {
    return {
        ngModule: AuthModule,
        providers: [
          AuthService,
          FonctionService,
          AuthGuard,
        ]
      };
  }
  */
}
