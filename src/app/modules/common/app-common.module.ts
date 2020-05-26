import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './header/menu/menu.component';
import { HomeComponent } from './home/home.component';
import { PrimengModule } from '../../modules.vendors/primeng/primeng.module';
import { MdBootstrapProModule } from '../../modules.vendors/mdbootstrap/md-bootstrap-pro.module';
import { EnvService } from './services/env.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../../modules.vendors/google.angular.material/material.module';
import { PdfViewerComponent } from './pdf/pdf-viewer/pdf-viewer.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AppCommonRoutingModule } from './app-common-routing.module';
import { NewsListeComponent } from './news/news-liste/news-liste.component';
import { NewsCreateComponent } from './news/news-create/news-create.component';
import { NewsComponent } from './news/news/news.component';
import { NewsDetailsComponent } from './news/news-details/news-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InterclubsModule } from '../interclubs/interclubs.module';
import { ImageZoomDialogComponent } from './utils/image-zoom-dialog/image-zoom-dialog.component';
@NgModule({
  declarations: [HeaderComponent, FooterComponent, MenuComponent, HomeComponent, PdfViewerComponent,
    NewsListeComponent, NewsCreateComponent, NewsComponent, NewsDetailsComponent, ImageZoomDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppCommonRoutingModule,
    PrimengModule,
    MdBootstrapProModule,
    FlexLayoutModule,
    MaterialModule,
    PdfViewerModule,
    NgxExtendedPdfViewerModule,
    //InterclubsModule,
  ],
  exports: [
    AppCommonRoutingModule,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    PdfViewerComponent,
  ],
  providers: [
    EnvService,
  ],
  entryComponents: [ImageZoomDialogComponent],
})
export class AppCommonModule {
}
