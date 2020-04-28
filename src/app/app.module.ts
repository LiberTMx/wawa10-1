import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule, NO_ERRORS_SCHEMA, LOCALE_ID} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

// REDUX - ngRx
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule, RouterState } from '@ngrx/router-store';
import { APP_META_REDUCERS, APP_REDUCERS } from './state/reducers/app.reducers';
//
import { environment } from '../environments/environment';
import { MaterialModule } from './modules.vendors/google.angular.material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthModule } from './modules/auth/auth.module';
//import { CustomRouteSerializer } from './state/custom-route-serializer';

// JWT
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
export function jwtOptionsFactory() {
  return {
    tokenGetter: () => {
      return localStorage.getItem('access_token');
    },
    // whitelistedDomains: ['localhost:3000'], // list of domains to which an authenticated request is sent
  };
}


// langue
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr);

// technical module
import { DeviceDetectorModule } from 'ngx-device-detector';
import { AppDefaultComponent } from './app-default/app-default.component';
import { PrimengModule } from './modules.vendors/primeng/primeng.module';
import { MdBootstrapProModule } from './modules.vendors/mdbootstrap/md-bootstrap-pro.module';
import { MessageService } from './common/message/message.service';

import { MessageComponent } from './common/message/message.component';
import { AppCommonModule } from './modules/common/app-common.module';
import { AdminModule } from './modules/admin/admin.module';
import { ContactModule } from './modules/contact/contact.module';
import { LocalModule } from './modules/local/local.module';
import { PrixModule } from './modules/prix/prix.module';
import { SponsorsModule } from './modules/sponsors/sponsors.module';
import { RequestInterceptor } from './common/utils/http-interceptor/request.interceptor';
import { StatusModule } from './modules/status/status.module';
import { RoiModule } from './modules/roi/roi.module';
import { EntrainementsModule } from './modules/entrainements/entrainements.module';
import { NewsletterModule } from './modules/newsletter/newsletter.module';
import { InterclubsModule } from './modules/interclubs/interclubs.module';
// import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';
//import { MDBSpinningPreloader } from 'ng-uikit-pro-standard';
//import { ButtonsModule, WavesModule, CollapseModule } from 'ng-uikit-pro-standard'

// import { PdfViewerModule } from 'ng2-pdf-viewer';
// import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

@NgModule({
  declarations: [
    AppComponent,
    AppDefaultComponent,
    MessageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    

    //
    // PasswordStrengthMeterModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientModule,
    MdBootstrapProModule,
    PrimengModule,
    MaterialModule,
    DeviceDetectorModule.forRoot(),
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
      },
    }),

    // REDUX
    // Redux
    StoreModule.forRoot(APP_REDUCERS, { metaReducers:  APP_META_REDUCERS }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument( {maxAge: 25, logOnly: environment.production}), // dev tools ne seront actifs que si on n'est PAS en production
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
      //serializer: CustomRouteSerializer,
      routerState: RouterState.Minimal
    }),

    // Application Modules
    AuthModule.forRoot(),
    AppCommonModule,
    AdminModule,
    ContactModule,
    LocalModule,
    PrixModule,
    SponsorsModule,
    StatusModule,
    RoiModule,
    EntrainementsModule,
    NewsletterModule,
    InterclubsModule,
    // Import the app routing module after the other app modules, so that the routes are merged
    AppRoutingModule, 
  ],
  providers: [
    MessageService,
    {provide: LOCALE_ID, useValue: 'fr-CA' },
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true, },
  ],
  bootstrap: [AppComponent],

  schemas: [ NO_ERRORS_SCHEMA ]
  
})
export class AppModule { }
