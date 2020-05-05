import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StagesComponent } from './stages/stages.component';
import { StagesRoutingModule } from './stages-routing.module';



@NgModule({
  declarations: [StagesComponent],
  imports: [
    CommonModule,
    StagesRoutingModule,
  ],
  exports: [
    StagesRoutingModule,
  ]

})
export class StagesModule { }
