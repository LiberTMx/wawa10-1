import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PeriodesComponent } from './periodes/periodes.component';


// { path: 'entrainements', component: EntrainementsComponent },
export const PERIODE_ROUTES: Routes =
[
    { path: 'activites',  children: [
            { path: 'periodes', children: [
              { path: '', component: PeriodesComponent },
            ] },
        ] }
];

@NgModule({
  imports: [RouterModule.forChild(PERIODE_ROUTES)],
  exports: [RouterModule]
})
export class PeriodeRoutingModule { }
