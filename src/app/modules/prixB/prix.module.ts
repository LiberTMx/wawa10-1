import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrixComponent } from './prix/prix.component';
import { MaterialModule } from '../../modules.vendors/google.angular.material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PrixRoutingModule } from './prix-routing.module';
import { MdBootstrapProModule } from '../../modules.vendors/mdbootstrap/md-bootstrap-pro.module';



@NgModule({
  declarations: [PrixComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule, 
    ReactiveFormsModule,
    FlexLayoutModule,
    PrixRoutingModule,
    MdBootstrapProModule,
    
  ],
  exports: [
    PrixRoutingModule,
    MaterialModule,
  ]
})
export class PrixModule { }
