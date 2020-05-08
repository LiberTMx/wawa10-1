import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntrainementsComponent } from './entrainements/entrainements.component';
import { ClasseCreateComponent } from './classe/classe-create/classe-create.component';
import { ClasseGroupesComponent } from './classe/classe-groupes/classe-groupes.component';


// { path: 'entrainements', component: EntrainementsComponent },
export const ENTRAINEMENTS_ROUTES: Routes =
[
    { path: 'activites',  children: [
            { path: 'entrainements', children: [
              { path: '', component: EntrainementsComponent },
              { path: 'classe-create', component: ClasseCreateComponent },
              { path: 'classe-groupes/:classeId', component: ClasseGroupesComponent },
            ] },
        ] }
];

@NgModule({
  imports: [RouterModule.forChild(ENTRAINEMENTS_ROUTES)],
  exports: [RouterModule]
})
export class EntrainementsRoutingModule { }
