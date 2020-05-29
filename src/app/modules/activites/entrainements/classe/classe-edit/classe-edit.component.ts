import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClasseStatusType } from '../../enums/classe-status.enum';
import { AuthenticatedUserModel } from '../../../../auth/model/authenticated-user.model';
import { KvpModel } from '../../../../../common/model/kvp.model';
import { AppUtils } from '../../../../../common/utils/AppUtils';
import { ActivatedRoute, Router } from '@angular/router';
import { EntrainementsService } from '../../services/entrainements.service';
import { ToastMessageService } from '../../../../../common/services/toast-message.service';
import { AuthService } from '../../../../auth/services/auth.service';
import { EntrainementClasseModel } from '../../model/entrainement-classe.model';

@Component({
  selector: 'app-classe-edit',
  templateUrl: './classe-edit.component.html',
  styleUrls: ['./classe-edit.component.scss']
})
export class ClasseEditComponent implements OnInit 
{

  loc=location.protocol+'//'+location.host;
  noImageUrl=this.loc+'/assets/news/no-image.jpg';
  imageUrl=null;

  viewPdf=false;
  pdfUrl=null;
  preview=false;

  classForm: FormGroup;

  classStatuses=ClasseStatusType;
  
  user: AuthenticatedUserModel=null;

  classeStatus: Array<KvpModel>=AppUtils.stringEnumToKeyValue(ClasseStatusType);
  
  loading=true;
  isImageLoading = true;
  entrainementClasse: EntrainementClasseModel=null;
  
  constructor(
    private authService: AuthService,
    private entrainementsService: EntrainementsService,
    private formBuilder: FormBuilder, 
    private route: ActivatedRoute,
    private router: Router,
    private toastMessageService: ToastMessageService,
  ) { }

  ngOnInit(): void 
  {
    this.user=this.authService.getCurrentUser();

    const entrainementClasseId = +this.route.snapshot.paramMap.get('entrainementClasseId');
    this.entrainementsService.getEntrainementClasse( entrainementClasseId )
        .subscribe( 
            classe => {
                    this.entrainementClasse=classe;
                    console.log('edit entrainement classe:', classe);
                    this.prepareForm();
                    this.loadImage();
                    this.loading=false;
                  } 
            ,
            err => console.error('Error loading classe', err )
    );
  }

  private loadImage()
  {
    if(this.entrainementClasse.imageFilename===null || this.entrainementClasse.imageFilename===undefined)
    {
      this.imageUrl=null;
      this.isImageLoading=false;
    }
    else
    {
      console.log('Loading image from server for classe '+ this.entrainementClasse.id+', image:'+this.entrainementClasse.imageFilename);
      this.getImageFromService();
    }
  }

  getImageFromService() 
  {
      this.isImageLoading = true;
      this.entrainementsService.downloadClasseImageFile(this.entrainementClasse).subscribe(data => {
        this.createImageFromBlob(data);
        this.isImageLoading = false;
      }, error => {
        this.isImageLoading = false;
        console.log(error);
      });
  }

  createImageFromBlob(image: Blob) 
  {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        this.imageUrl = reader.result;
      }, false);

      if (image) {
        reader.readAsDataURL(image);
      }
  }

  private prepareForm()
  {
    this.classForm = this.formBuilder.group({
      id: [this.entrainementClasse.id],
      titre: [this.entrainementClasse.titre, Validators.required],
      presentation: [this.entrainementClasse.presentation, Validators.required],
      status: [this.entrainementClasse.status, Validators.required],
      externalLink: [this.entrainementClasse.externalLink],
      showOrder: [this.entrainementClasse.showOrder],
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

  onUpdateClasse()
  {
    console.log('create classe:', this.classForm.value);
    const titre=this.classForm.value.titre;
    this.entrainementsService.updateClasse(this.classForm.value)
      .subscribe(res => {
            console.log('update classe result:', res);
            this.toastMessageService.addSuccess('Modification classe', 'La classe a été modifiée: '+titre, 5000);
            this.router.navigate(['activites','entrainements']);
          }
        ,
        err => {
          console.error('unable to modify the classe', err);
          if(err.error)
          {
            this.toastMessageService.addError('Modification classe', 'Une erreur s\'est produite:'+err.error.message, 11000);
          }
          else
          {
            this.toastMessageService.addError('Modification classe', 'Une erreur s\'est produite:'+err.message, 10000);
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

  onCancel()
  {
    this.router.navigate(['activites','entrainements']); 
  }
}
