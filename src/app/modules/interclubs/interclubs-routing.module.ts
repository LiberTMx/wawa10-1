import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeuilleDeMatchComponent } from './feuille-de-match/feuille-de-match.component';
import { SelectionComponent } from './selections/selection/selection.component';
import { SelectionInformationComponent } from './selection-information/selection-information.component';

export const INTERCLUBS_ROUTES: Routes =
[
    { path: 'interclubs',  children: [
            { path: 'feuille', component: FeuilleDeMatchComponent },
            { path: 'selectioninfo', component: SelectionInformationComponent },
            { path: ':id', component: SelectionComponent },
        ] }
];

@NgModule({
  imports: [RouterModule.forChild(INTERCLUBS_ROUTES)],
  exports: [RouterModule]
})
export class InterclubsRoutingModule { }
