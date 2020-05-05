import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NewsStatusType } from '../types/news-status.enum';

import { NewsService } from '../services/news.service';
import { AuthenticatedUserModel } from '../../../auth/model/authenticated-user.model';
import { KvpModel } from '../../../../common/model/kvp.model';
import { AppUtils } from '../../../../common/utils/AppUtils';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { ToastMessageService } from '../../../../common/services/toast-message.service';

@Component({
  selector: 'app-news-create',
  templateUrl: './news-create.component.html',
  styleUrls: ['./news-create.component.scss']
})
export class NewsCreateComponent implements OnInit {

  loc=location.protocol+'//'+location.host;
  noImageUrl=this.loc+'/assets/news/no-image.jpg';
  imageUrl=this.loc+'/assets/news/no-image.jpg';

  viewPdf=false;
  pdfUrl=null;

  newsForm: FormGroup;

  newsStatuses=NewsStatusType;
  
  user: AuthenticatedUserModel=null;

  newsStatus: Array<KvpModel>=AppUtils.stringEnumToKeyValue(NewsStatusType);
  
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder, 
    private newsService: NewsService,
    private router: Router,
    private toastMessageService: ToastMessageService,
  ) { }

  ngOnInit(): void
  {
    this.user=this.authService.getCurrentUser();
    this.newsForm = this.formBuilder.group({
      title: ['', Validators.required],
      presentation: ['', Validators.required],
      status: ['VISIBLE', Validators.required],
      externalLink: [''],
      showOrder: ['0'],
      avatar: [null],
      pdf: [''],
      image: [''],
      avatarPdf: [null],
    });
  }

  showPreview(event)
  {
    const file = (event.target as HTMLInputElement).files[0];
    this.newsForm.patchValue({
      avatar: file
    });
    this.newsForm.get('avatar').updateValueAndValidity();

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onDeleteImage()
  {
    this.newsForm.patchValue({
      avatar: null,
      image: null
    });
    this.imageUrl=this.noImageUrl;
  }

  getUserFullName(): string
  {
    let userFullName='';
    if(this.user!==null)
    {
      userFullName=this.user.getFullName();
    }
    return userFullName;
  }

  onCreateNews()
  {
    console.log('create news:', this.newsForm.value);
    const title=this.newsForm.value.title;
    this.newsService.createNews(this.newsForm.value, this.user)
      .subscribe(res => {
          console.log('create news result:', res);
          this.toastMessageService.addSuccess('Création news', 'La news a été créée: '+title, 5000);
          this.router.navigate(['news','liste','admin']);
        }
        ,
        err => {
          console.error('unable to create the news', err);
          
          if(err.error)
          {
            this.toastMessageService.addError('Création news', 'Une erreur s\'est produite:'+err.error.message, 11000);
          }
          else
          {
            this.toastMessageService.addError('Création news', 'Une erreur s\'est produite:'+err.message, 10000);
          }
        }
    );
    return false;
  }

  preloadPdf(event)
  {
    const file = (event.target as HTMLInputElement).files[0];
    this.newsForm.patchValue({
      avatarPdf: file
    });
    this.newsForm.get('avatarPdf').updateValueAndValidity();

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.pdfUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onRemovePdf()
  {
    this.newsForm.patchValue({
      avatarPdf: null,
      pdf: null
    });
    this.pdfUrl=null;
  }

  onShowPdf(show: boolean)
  {
    this.viewPdf=show;
  }
}
