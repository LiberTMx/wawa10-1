import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { InactivityTrackerEffects } from './state/effects/inactivity-tracker.effects';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EffectsModule.forFeature([InactivityTrackerEffects]),
  ]
})
export class InactivityTrackerModule { }
