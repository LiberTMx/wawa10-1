import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrixComponent } from './prix/prix.component';


// const routes: Routes = [];

export const CONTACT_ROUTES: Routes =
[
    { path: 'prix',  children: [
        { path: 'liste', component: PrixComponent },
        ] }
];

@NgModule({
  imports: [RouterModule.forChild(CONTACT_ROUTES)],
  exports: [RouterModule]
})
export class PrixRoutingModule { }
