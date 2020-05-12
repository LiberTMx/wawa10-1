import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeriodesComponent } from './periodes/periodes.component';
import { PeriodeAddDialogComponent } from './periode-add-dialog/periode-add-dialog.component';
import { PeriodeRoutingModule } from './periode-routing.module';
import { MaterialModule } from '../../../modules.vendors/google.angular.material/material.module';
import { MdBootstrapProModule } from '../../../modules.vendors/mdbootstrap/md-bootstrap-pro.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [PeriodesComponent, PeriodeAddDialogComponent],
  imports: [
    CommonModule,
    MaterialModule,
    MdBootstrapProModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    PeriodeRoutingModule,
  ],
  exports: [
    PeriodeRoutingModule,
  ],
  entryComponents:[
    PeriodeAddDialogComponent,
  ]
})
export class PeriodesModule { }
