import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntrainementsComponent } from './entrainements/entrainements.component';
import { EntrainementsRoutingModule } from './entrainements-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../../../modules.vendors/google.angular.material/material.module';
import { MdBootstrapProModule } from '../../../modules.vendors/mdbootstrap/md-bootstrap-pro.module';
import { ClasseCreateComponent } from './classe/classe-create/classe-create.component';
import { ClasseEditComponent } from './classe/classe-edit/classe-edit.component';
import { ClasseComponent } from './classe/classe/classe.component';
import { ClasseGroupesComponent } from './classe/classe-groupes/classe-groupes.component';
import { GroupeComponent } from './groupe/groupe.component';
import { ClasseGroupeAddDialogComponent } from './classe/classe-groupe-add-dialog/classe-groupe-add-dialog.component';
import { PeriodesModule } from '../periodes/periodes.module';
import { SeanceAddDialogComponent } from './groupe/seance-add-dialog/seance-add-dialog.component';
import { AppCommonModule } from '../../common/app-common.module';
import { SeanceComponent } from './groupe/seance/seance.component';
import { PrimengModule } from '../../../modules.vendors/primeng/primeng.module';



@NgModule({
  declarations: [
    EntrainementsComponent, ClasseCreateComponent, ClasseEditComponent, 
    ClasseComponent, ClasseGroupesComponent, GroupeComponent, 
    ClasseGroupeAddDialogComponent, SeanceAddDialogComponent, SeanceComponent
  ],
  imports: [
    CommonModule,
    // EntrainementsRoutingModule,
    PrimengModule,
    MaterialModule,
    MdBootstrapProModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    PeriodesModule,
  ],
  exports: [
    EntrainementsRoutingModule,
  ],
  entryComponents:[
    ClasseGroupeAddDialogComponent,
    SeanceAddDialogComponent,
  ]
})
export class EntrainementsModule { }
