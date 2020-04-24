import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoiComponent } from './roi/roi.component';


export const ROI_ROUTES: Routes =
[
    { path: 'roi',  children: [
        { path: '', component: RoiComponent },
        // { path: 'black-list', component: ContactBlackListComponent },
        ] }
];

@NgModule({
  imports: [RouterModule.forChild(ROI_ROUTES)],
  exports: [RouterModule]
})
export class RoiRoutingModule { }
