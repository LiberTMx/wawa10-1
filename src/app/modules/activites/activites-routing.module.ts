import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntrainementsComponent } from './entrainements/entrainements/entrainements.component';
import { STAGES_ROUTES } from './stages/stages-routing.module';
import { ENTRAINEMENTS_ROUTES } from './entrainements/entrainements-routing.module';
import { CALENDRIER_ROUTES } from './calendrier/calendrier-routing.module';
import { PERIODE_ROUTES } from './periodes/periode-routing.module';

export const ACTIVITES_ROUTES: Routes =
[
    //{ path: 'activites',  children: [
    //        { path: 'entrainements', component: EntrainementsComponent },
    //    ] }

    ...CALENDRIER_ROUTES,
    ...ENTRAINEMENTS_ROUTES,
    ...STAGES_ROUTES,
    ...PERIODE_ROUTES,
];

@NgModule({
  imports: [RouterModule.forChild(ACTIVITES_ROUTES)],
  exports: [RouterModule]
})
export class ActivitesRoutingModule { }
