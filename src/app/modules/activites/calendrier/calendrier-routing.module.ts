import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendrierComponent } from './calendrier/calendrier.component';

export const CALENDRIER_ROUTES: Routes =
[
    { path: 'activites',  children: [
            { path: 'calendrier', component: CalendrierComponent },
        ] }
];

@NgModule({
  imports: [RouterModule.forChild(CALENDRIER_ROUTES)],
  exports: [RouterModule]
})
export class CalendrierRoutingModule { }
