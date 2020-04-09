import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { InterclubsComponent } from './interclubs/interclubs.component';
import { EquipesComponent } from './interclubs/equipes/equipes.component';
import { MdBootstrapProModule } from '../../modules.vendors/mdbootstrap/md-bootstrap-pro.module';
import { AdminService } from './services/admin.service';
import { EquipesByCategoryComponent } from './interclubs/equipes-by-category/equipes-by-category.component';
import { RolesComponent } from './roles/roles.component';
import { DomainsComponent } from './roles/domains/domains.component';
import { GroupesComponent } from './roles/groupes/groupes.component';
import { RoleComponent } from './roles/role/role.component';
import { GroupRoleComponent } from './roles/group-role/group-role.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DivisionsComponent } from './interclubs/divisions/divisions.component';
import { ListesdesforcesByCategoryComponent } from './interclubs/listesdesforces-by-category/listesdesforces-by-category.component';
import { ListesdesforcesComponent } from './interclubs/listesdesforces/listesdesforces.component';
import { DivisionsByCategoryComponent } from './interclubs/divisions-by-category/divisions-by-category.component';
import { SynchronisationComponent } from './interclubs/synchronisation/synchronisation.component';
import { CalendriersComponent } from './interclubs/calendriers/calendriers.component';
import { CalendriersByCategoryComponent } from './interclubs/calendriers-by-category/calendriers-by-category.component';
import { SemainesComponent } from './interclubs/semaines/semaines.component';
import { SemainesByCategoryComponent } from './interclubs/semaines-by-category/semaines-by-category.component';



@NgModule({
  declarations: [
    InterclubsComponent, 
    EquipesComponent, 
    EquipesByCategoryComponent, 
    RolesComponent, 
    DomainsComponent, 
    GroupesComponent, 
    RoleComponent, 
    GroupRoleComponent, 
    DivisionsComponent, 
    ListesdesforcesByCategoryComponent, 
    ListesdesforcesComponent, 
    DivisionsByCategoryComponent, SynchronisationComponent, CalendriersComponent, CalendriersByCategoryComponent, SemainesComponent, SemainesByCategoryComponent,
    EquipesComponent, EquipesByCategoryComponent, RolesComponent, DomainsComponent, GroupesComponent, RoleComponent, GroupRoleComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MdBootstrapProModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
  ],
  exports: [
    AdminRoutingModule,
  ],
  providers: [
    AdminService,
  ]
})
export class AdminModule { }
