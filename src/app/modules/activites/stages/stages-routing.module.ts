import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StagesComponent } from './stages/stages.component';

export const STAGES_ROUTES: Routes =
[
    { path: 'activites',  children: [
            { path: 'stages', component: StagesComponent},
        ] }
];

@NgModule({
  imports: [RouterModule.forChild(STAGES_ROUTES)],
  exports: [RouterModule]
})
export class StagesRoutingModule { }
