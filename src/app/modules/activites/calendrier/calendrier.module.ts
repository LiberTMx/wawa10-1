import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendrierComponent } from './calendrier/calendrier.component';
import { CalendrierRoutingModule } from './calendrier-routing.module';



@NgModule({
  declarations: [CalendrierComponent],
  imports: [
    CommonModule,
    CalendrierRoutingModule,
  ],
  exports: [
    CalendrierRoutingModule,
  ]

})
export class CalendrierModule { }
