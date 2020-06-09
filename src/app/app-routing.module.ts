import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './modules/common/home/home.component';


const routes: Routes = [
  {path: 'login', redirectTo: 'auth/login'},
  {path: 'default', component: HomeComponent},

  // Default routes
  { path: '', redirectTo: 'default', pathMatch: 'full' },
  { path: '**', redirectTo: 'default', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled'} )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
