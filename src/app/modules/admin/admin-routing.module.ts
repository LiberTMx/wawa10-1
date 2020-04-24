import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InterclubsComponent } from './interclubs/interclubs.component';
import { RolesComponent } from './roles/roles.component';


// const routes: Routes = [];

export const ADMIN_ROUTES: Routes =
[
    { path: 'admin',  children: [
        { path: 'interclubs', component: InterclubsComponent },
        { path: 'roles', component: RolesComponent },
        
        ] }
];

@NgModule({
  imports: [RouterModule.forChild(ADMIN_ROUTES)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
