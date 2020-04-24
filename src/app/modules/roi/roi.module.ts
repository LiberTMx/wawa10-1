import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoiComponent } from './roi/roi.component';
import { RoiRoutingModule } from './roi-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppCommonModule } from '../common/app-common.module';



@NgModule({
  declarations: [RoiComponent],
  imports: [
    CommonModule,
    RoiRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AppCommonModule,
  ],
  exports: [
    RoiRoutingModule,
  ]
})
export class RoiModule { }
