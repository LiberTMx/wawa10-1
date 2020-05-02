import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeuilleDeMatchComponent } from './feuille-de-match/feuille-de-match.component';
import { InterclubsRoutingModule } from './interclubs-routing.module';
import { MaterialModule } from '../../modules.vendors/google.angular.material/material.module';
import { PrimengModule } from '../../modules.vendors/primeng/primeng.module';
import { MdBootstrapProModule } from '../../modules.vendors/mdbootstrap/md-bootstrap-pro.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SelectionComponent } from './selections/selection/selection.component';
import { StoreModule } from '@ngrx/store';
import { interclubsReducer } from './state/reducers/interclubs.reducer';
import { SelectionService } from './selections/services/selection.service';
import { HommesComponent } from './selections/selection/hommes/hommes.component';



@NgModule({
  declarations: [FeuilleDeMatchComponent, SelectionComponent, HommesComponent],
  imports: [
    CommonModule,
    InterclubsRoutingModule,
    MaterialModule,
    PrimengModule,
    MdBootstrapProModule,

    StoreModule.forFeature('interclubsModule', interclubsReducer ),

    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
  ],
  exports: [
    InterclubsRoutingModule,
    // SelectionService,
  ],
  providers: [
    SelectionService,
  ]
})
export class InterclubsModule { }
