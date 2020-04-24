import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {AccordionModule} from 'primeng/accordion';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {MenubarModule} from 'primeng/menubar';
import {PasswordModule} from 'primeng/password';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {SidebarModule} from 'primeng/sidebar';
import {SplitButtonModule} from 'primeng/splitbutton';
import {TableModule} from 'primeng/table';
import {TabViewModule} from 'primeng/tabview';
import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';

import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {MultiSelectModule} from 'primeng/multiselect';
import {CalendarModule} from 'primeng/calendar';

import {PanelModule} from 'primeng/panel';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    AccordionModule,
    ButtonModule,
    CardModule,
    ConfirmDialogModule,
    DropdownModule,
    InputTextareaModule,
    MenubarModule,
    PasswordModule,
    ScrollPanelModule,
    SidebarModule,
    SplitButtonModule,
    TableModule,
    TabViewModule,
    ToastModule,
    ToolbarModule,
    MultiSelectModule,
    CalendarModule,
    PanelModule,
  ],
  exports: [
    AccordionModule,
    ButtonModule,
    CardModule,
    ConfirmDialogModule,
    DropdownModule,
    InputTextareaModule,
    MenubarModule,
    ScrollPanelModule,
    SidebarModule,
    SplitButtonModule,
    TableModule,
    TabViewModule,
    ToastModule,
    ToolbarModule,
    MultiSelectModule,
    CalendarModule,
    PanelModule,
  ],
  providers: [
    ConfirmationService
  ]
})
export class PrimengModule { }
