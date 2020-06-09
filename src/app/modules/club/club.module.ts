import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComiteComponent } from './comite/comite.component';
import { ClubRoutingModule } from './club-routing.module';
import { AuthModule } from '../auth/auth.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../../modules.vendors/google.angular.material/material.module';
import { MdBootstrapProModule } from '../../modules.vendors/mdbootstrap/md-bootstrap-pro.module';
import { PrimengModule } from '../../modules.vendors/primeng/primeng.module';
import { ComiteOrganisationComponent } from './comite-organisation/comite-organisation.component';
import { ComiteOrganisationUpdateComponent } from './comite-organisation-update/comite-organisation-update.component';



@NgModule({
  declarations: [ComiteComponent, ComiteOrganisationComponent, ComiteOrganisationUpdateComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    PrimengModule,
    MdBootstrapProModule,
    AuthModule, 
    ClubRoutingModule,
  ]
})
export class ClubModule { }
