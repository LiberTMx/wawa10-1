import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComiteComponent } from './comite/comite.component';
import { ComiteOrganisationComponent } from './comite-organisation/comite-organisation.component';

export const CLUB_ROUTES: Routes =
[
    { path: 'club',  children: [
            { path: 'comite', component: ComiteComponent },
            { path: 'organisation', component: ComiteOrganisationComponent },
        ] }
];

@NgModule({
  imports: [RouterModule.forChild(CLUB_ROUTES)],
  exports: [RouterModule]
})
export class ClubRoutingModule { }
