import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { AuthenticatedUserModel } from '../../auth/model/authenticated-user.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClubService } from '../services/club.service';

@Component({
  selector: 'app-comite-organisation',
  templateUrl: './comite-organisation.component.html',
  styleUrls: ['./comite-organisation.component.scss']
})
export class ComiteOrganisationComponent implements OnInit {

  //connectedUser: AuthenticatedUserModel = null;

  toggleEnabled=false;
  toggleState=1;

  loc=location.protocol+'//'+location.host;

  pdfUrl=null;
  viewPdf=false;

  organisationForm: FormGroup;
  user: AuthenticatedUserModel=null;
  
  documentUrl=null;
  isDocumentLoading=true;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder, 
    private clubService: ClubService,
  ) { }

  ngOnInit(): void 
  {
    this.user=this.authService.getCurrentUser();
    // console.log('user - roi', this.user);

    this.organisationForm = this.formBuilder.group({
      pdf: [''],
      avatar: [null],
      avatarPdf: [null],
    });

    this.getDocumentFromService();

    if( this.isConnectedUserClubAdmin() )
    {
      this.toggleEnabled=true;
    }

    /*
    try
    {
      //this.getDocumentFromService();
    }
    catch(error)
    {
      console.log('onInit',error);
    }
    */
    
  }

  isConnectedUserClubAdmin()
  {
    return this.authService.isUserClubAdmin();
  }

  getDocumentFromService() 
  {
    console.log('Trying to load the organisation pdf...');

    this.isDocumentLoading = true;
    this.clubService.getOrganisationPdfDocumentFile().subscribe(data => {
      console.log('org doc', data);
      if( data !== null && data !== undefined)
      {
        this.createDocumentFromBlob(data);
        this.isDocumentLoading = false;
      }

    }, error => {
      this.documentUrl=null;
      this.isDocumentLoading = false;
      console.log(error);
    }
    ,
    () => {
      this.isDocumentLoading = false;
    }
    );

    return false;
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
    this.pdfUrl = null;
    const file = (event.target as HTMLInputElement).files[0];
    this.organisationForm.patchValue({
      avatarPdf: file
    });
    this.organisationForm.get('avatarPdf').updateValueAndValidity();

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.pdfUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onRemovePdf()
  {
    this.organisationForm.patchValue({
      avatarPdf: null,
      pdf: null
    });
    this.pdfUrl=null;
  }

  onToggleState()
  {
    this.toggleState = (this.toggleState === 1) ? 2 : 1;
  }

  onUpdateOrganisation()
  {
    if (this.pdfUrl===null)
    {
      return;
    }

    console.log('create or update the organisation document:', this.organisationForm.value);
    this.clubService.updateOrganisation(this.organisationForm.value, this.user)
      .subscribe(res => {
          console.log('create or update organisation document result:', res);
          this.documentUrl=null;
          this.toggleState=1;
          this.getDocumentFromService();
        }
        ,
        err => console.error('unable to create or update the organisation document', err)
    );
    return false;
  }

}
