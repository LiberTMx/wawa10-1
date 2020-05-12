import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComiteComponent } from './comite/comite.component';

export const CLUB_ROUTES: Routes =
[
    { path: 'club',  children: [
            { path: 'comite', component: ComiteComponent },
        ] }
];

@NgModule({
  imports: [RouterModule.forChild(CLUB_ROUTES)],
  exports: [RouterModule]
})
export class ClubRoutingModule { }
