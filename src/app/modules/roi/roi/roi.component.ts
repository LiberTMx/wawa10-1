import { Component, OnInit } from '@angular/core';
import { AuthenticatedUserModel } from '../../auth/model/authenticated-user.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../../auth/services/auth.service';
import { RoiService } from '../services/roi.service';

@Component({
  selector: 'app-roi',
  templateUrl: './roi.component.html',
  styleUrls: ['./roi.component.scss']
})
export class RoiComponent implements OnInit 
{

  loc=location.protocol+'//'+location.host;

  pdfUrl=null;
  viewPdf=false;

  statusForm: FormGroup;
  user: AuthenticatedUserModel=null;
  
  documentUrl=null;
  isDocumentLoading=true;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder, 
    private roiService: RoiService,
  ) { }

  ngOnInit(): void 
  {
    this.user=this.authService.getCurrentUser();
    console.log('user - roi', this.user);

    this.statusForm = this.formBuilder.group({
      pdf: [''],
      avatar: [null],
      avatarPdf: [null],
    });

    try
    {
      this.getDocumentFromService();
    }
    catch(error)
    {
      console.log(error);
    }
    
  }

  isUserClubAdmin()
  {
    return this.authService.isUserClubAdmin();
  }

  getDocumentFromService() 
  {
    console.log('Trying to load the roi pdf...');

    this.isDocumentLoading = true;
    this.roiService.downloadDocumentFile().subscribe(data => {
      if( data !== null && data !== undefined)
      {
        this.createDocumentFromBlob(data);
        this.isDocumentLoading = false;
      }

    }, error => {
      this.isDocumentLoading = false;
      console.log(error);
    });

  }

  createDocumentFromBlob(document: Blob) 
  {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.documentUrl = reader.result;
    }, false);

    if (document) {
      reader.readAsDataURL(document);
    }
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

  preloadPdf(event)
  {
    const file = (event.target as HTMLInputElement).files[0];
    this.statusForm.patchValue({
      avatarPdf: file
    });
    this.statusForm.get('avatarPdf').updateValueAndValidity();

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.pdfUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onRemovePdf()
  {
    this.statusForm.patchValue({
      avatarPdf: null,
      pdf: null
    });
    this.pdfUrl=null;
  }

  onShowPdf(show: boolean)
  {
    this.viewPdf=show;
  }


  onCreateOrUpdateStatus()
  {
    console.log('create or update the status document:', this.statusForm.value);
    this.roiService.createOrUpdateStatus(this.statusForm.value, this.user)
      .subscribe(res => console.log('create or update status document result:', res)
        ,
        err => console.error('unable to create or update the status document', err)
    );
    return false;
  }

}
