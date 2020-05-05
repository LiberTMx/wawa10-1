import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntrainementsComponent } from './entrainements/entrainements.component';
import { ClasseCreateComponent } from './classe/classe-create/classe-create.component';


// { path: 'entrainements', component: EntrainementsComponent },
export const ENTRAINEMENTS_ROUTES: Routes =
[
    { path: 'activites',  children: [
            { path: 'entrainements', children: [
              { path: '', component: EntrainementsComponent },
              { path: 'classe-create', component: ClasseCreateComponent },
            ] },
        ] }
];

@NgModule({
  imports: [RouterModule.forChild(ENTRAINEMENTS_ROUTES)],
  exports: [RouterModule]
})
export class EntrainementsRoutingModule { }
