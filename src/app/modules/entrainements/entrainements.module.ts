import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntrainementsComponent } from './entrainements/entrainements.component';
import { EntrainementsRoutingModule } from './entrainements-routing.module';
import { MaterialModule } from '../../modules.vendors/google.angular.material/material.module';
import { MdBootstrapProModule } from '../../modules.vendors/mdbootstrap/md-bootstrap-pro.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [EntrainementsComponent],
  imports: [
    CommonModule,
    EntrainementsRoutingModule,
    MaterialModule,
    MdBootstrapProModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
  ],
  exports: [
    EntrainementsRoutingModule,
  ]
})
export class EntrainementsModule { }
