import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatusComponent } from './status/status.component';


// const routes: Routes = [];

export const STATUS_ROUTES: Routes =
[
    { path: 'status',  children: [
        { path: '', component: StatusComponent },
        // { path: 'black-list', component: ContactBlackListComponent },
        ] }
];

@NgModule({
  imports: [RouterModule.forChild(STATUS_ROUTES)],
  exports: [RouterModule]
})
export class StatusRoutingModule { }
