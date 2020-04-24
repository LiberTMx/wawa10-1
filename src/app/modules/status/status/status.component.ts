import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { StatusService } from '../services/status.service';
import { AuthenticatedUserModel } from '../../auth/model/authenticated-user.model';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit 
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
    private statusService: StatusService,
  ) { }

  ngOnInit(): void 
  {
    this.user=this.authService.getCurrentUser();

    this.statusForm = this.formBuilder.group({
      pdf: [''],
      avatar: [null],
      avatarPdf: [null],
    });

    this.getDocumentFromService();
  }

  isUserClubAdmin()
  {
    return this.authService.isUserClubAdmin();
  }
  
  getDocumentFromService() 
  {
    this.isDocumentLoading = true;
    this.statusService.downloadDocumentFile().subscribe(data => {
      this.createDocumentFromBlob(data);
      this.isDocumentLoading = false;
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
    this.statusService.createOrUpdateStatus(this.statusForm.value, this.user)
      .subscribe(res => console.log('create or update status document result:', res)
        ,
        err => console.error('unable to create or update the status document', err)
    );
    return false;
  }

}
