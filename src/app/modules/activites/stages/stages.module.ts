import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StagesComponent } from './stages/stages.component';
import { StagesRoutingModule } from './stages-routing.module';
import { MaterialModule } from '../../../modules.vendors/google.angular.material/material.module';
import { PrimengModule } from '../../../modules.vendors/primeng/primeng.module';
import { MdBootstrapProModule } from '../../../modules.vendors/mdbootstrap/md-bootstrap-pro.module';



@NgModule({
  declarations: [StagesComponent],
  imports: [
    CommonModule,
    MaterialModule,
    PrimengModule,
    MdBootstrapProModule,
    StagesRoutingModule,
  ],
  exports: [
    StagesRoutingModule,
  ]

})
export class StagesModule { }
