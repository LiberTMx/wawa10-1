import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { NewsletterRoutingModule } from './newsletter-routing.module';



@NgModule({
  declarations: [NewsletterComponent],
  imports: [
    CommonModule,
    NewsletterRoutingModule,
  ],
  exports: [
    NewsletterRoutingModule
  ]
})
export class NewsletterModule { }
