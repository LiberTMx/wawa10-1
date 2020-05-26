import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StagesComponent } from './stages/stages.component';
import { StagesRoutingModule } from './stages-routing.module';
import { MaterialModule } from '../../../modules.vendors/google.angular.material/material.module';
import { PrimengModule } from '../../../modules.vendors/primeng/primeng.module';
import { MdBootstrapProModule } from '../../../modules.vendors/mdbootstrap/md-bootstrap-pro.module';
import { StagePresentationComponent } from './stage-presentation/stage-presentation.component';
import { StageCreateComponent } from './stage-create/stage-create.component';
import { AuthModule } from '../../auth/auth.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [StagesComponent, StagePresentationComponent, StageCreateComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    PrimengModule,
    MdBootstrapProModule,
    AuthModule,
    FormsModule,
    ReactiveFormsModule,
    StagesRoutingModule,
  ],
  exports: [
    StagesRoutingModule,
  ]

})
export class StagesModule { }
