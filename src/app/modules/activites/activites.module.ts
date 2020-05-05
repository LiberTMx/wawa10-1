import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntrainementsModule } from './entrainements/entrainements.module';
import { ActivitesRoutingModule } from './activites-routing.module';
import { CalendrierModule } from './calendrier/calendrier.module';
import { StagesModule } from './stages/stages.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    
    CalendrierModule,
    EntrainementsModule,
    StagesModule,
    
    ActivitesRoutingModule,
  ],
  exports: [
    ActivitesRoutingModule,
  ]
})
export class ActivitesModule { }
