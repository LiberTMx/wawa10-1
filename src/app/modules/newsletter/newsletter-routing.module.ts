import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsletterComponent } from './newsletter/newsletter.component';

export const NEWSLETTER_ROUTES: Routes =
[
    { path: 'newsletter',  children: [
            { path: '', component: NewsletterComponent },
        ] }
];

@NgModule({
  imports: [RouterModule.forChild(NEWSLETTER_ROUTES)],
  exports: [RouterModule]
})
export class NewsletterRoutingModule { }
