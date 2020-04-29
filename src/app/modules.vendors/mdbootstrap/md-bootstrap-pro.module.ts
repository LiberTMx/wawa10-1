import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { DropdownModule, TabsModule, WavesModule } from 'ng-uikit-pro-standard';
import { MDBSpinningPreloader, MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { InputsModule, ButtonsModule } from 'ng-uikit-pro-standard';
import { PreloadersModule } from 'ng-uikit-pro-standard';
import { CollapseModule } from 'ng-uikit-pro-standard';
// MDB Angular Pro
//import {  WavesModule, DropdownModule.forRoot() } from 'ng-uikit-pro-standard';


@NgModule({
  imports: [
    /*
    DropdownModule.forRoot(),
    TabsModule,
    WavesModule,
    
    //ToastModule.forRoot(),
    InputsModule,
    ButtonsModule,
    PreloadersModule,
    CollapseModule,*/
    MDBBootstrapModulesPro.forRoot(),
  ],

  exports: [
    /*
    DropdownModule,
    TabsModule,
    WavesModule,
    //ToastModule
    InputsModule,
    ButtonsModule,
    PreloadersModule,
    CollapseModule,*/
    MDBBootstrapModulesPro,
  ],

  declarations: [],
  
  providers: [
    MDBSpinningPreloader
  ],
  
  schemas: [ NO_ERRORS_SCHEMA ]
  
})
export class MdBootstrapProModule { }
