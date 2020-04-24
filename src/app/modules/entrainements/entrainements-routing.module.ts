import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntrainementsComponent } from './entrainements/entrainements.component';

export const ENTRAINEMENTS_ROUTES: Routes =
[
    { path: 'entrainements',  children: [
            { path: '', component: EntrainementsComponent },
        ] }
];

@NgModule({
  imports: [RouterModule.forChild(ENTRAINEMENTS_ROUTES)],
  exports: [RouterModule]
})
export class EntrainementsRoutingModule { }
