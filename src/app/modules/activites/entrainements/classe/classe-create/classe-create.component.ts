import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../auth/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppUtils } from '../../../../../common/utils/AppUtils';
import { AuthenticatedUserModel } from '../../../../auth/model/authenticated-user.model';
import { ClasseStatusType } from '../../enums/classe-status.enum';
import { KvpModel } from '../../../../../common/model/kvp.model';
import { EntrainementsService } from '../../services/entrainements.service';
import { Router } from '@angular/router';
import { ToastMessageService } from '../../../../../common/services/toast-message.service';

@Component({
  selector: 'app-entrainement-classe-create',
  templateUrl: './classe-create.component.html',
  styleUrls: ['./classe-create.component.scss']
})
export class ClasseCreateComponent implements OnInit {

  loc=location.protocol+'//'+location.host;
  noImageUrl=this.loc+'/assets/news/no-image.jpg';
  imageUrl=this.loc+'/assets/news/no-image.jpg';

  viewPdf=false;
  pdfUrl=null;
  preview=false;

  classForm: FormGroup;

  classStatuses=ClasseStatusType;
  
  user: AuthenticatedUserModel=null;

  classeStatus: Array<KvpModel>=AppUtils.stringEnumToKeyValue(ClasseStatusType);

  constructor(
    private authService: AuthService,
    private entrainementsService: EntrainementsService,
    private formBuilder: FormBuilder, 
    private router: Router,
    private toastMessageService: ToastMessageService,
  ) { }

  ngOnInit(): void 
  {
    this.user=this.authService.getCurrentUser();
    this.classForm = this.formBuilder.group({
      titre: ['', Validators.required],
      presentation: ['', Validators.required],
      status: ['VISIBLE', Validators.required],
      externalLink: [''],
      showOrder: ['0'],
      avatar: [null],
      image: [''],
    });
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

  onDeleteImage()
  {
    this.classForm.patchValue({
      avatar: null,
      image: null
    });
    this.imageUrl=this.noImageUrl;
  }

  showPreview(event)
  {
    const file = (event.target as HTMLInputElement).files[0];
    this.classForm.patchValue({
      avatar: file
    });
    this.classForm.get('avatar').updateValueAndValidity();

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onPreviewToggle()
  {
    this.preview = ! this.preview;
  }

  onCreateClasse()
  {
    console.log('create classe:', this.classForm.value);
    const titre=this.classForm.value.titre;
    this.entrainementsService.createClasse(this.classForm.value)
      .subscribe(res => {
            console.log('create classe result:', res);
            this.toastMessageService.addSuccess('Création classe', 'La classe a été créée: '+titre, 5000);
            this.router.navigate(['activites','entrainements']);
          }
        ,
        err => {
          console.error('unable to create the classe', err);
          if(err.error)
          {
            this.toastMessageService.addError('Création classe', 'Une erreur s\'est produite:'+err.error.message, 11000);
          }
          else
          {
            this.toastMessageService.addError('Création classe', 'Une erreur s\'est produite:'+err.message, 10000);
          }
        }
    );
  }

  getClasseTitle(): string
  {
    return this.classForm.value.titre;
  }

  getClassePresentation(): string
  {
    return this.classForm.value.presentation;
  }
}
