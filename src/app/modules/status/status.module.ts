import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusComponent } from './status/status.component';
import { StatusRoutingModule } from './status-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PdfViewerComponent } from '../common/pdf/pdf-viewer/pdf-viewer.component';
import { AppCommonModule } from '../common/app-common.module';



@NgModule({
  declarations: [
    StatusComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StatusRoutingModule,
    AppCommonModule,
  ],
  exports: [
    StatusRoutingModule,
  ]
})
export class StatusModule { }
