import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ImageZoomDialogComponent } from '../../../common/utils/image-zoom-dialog/image-zoom-dialog.component';
import { PeriodeModel } from '../../periodes/model/periode.model';
import { PeriodesService } from '../../periodes/services/periodes.service';
import { IMyOptions, LocaleService } from 'ng-uikit-pro-standard';
import { mdbdatepicker_locales } from '../../../../common/interfaces/mdbdatepicker.locale';
import { StagesService } from '../services/stages.service';
import { Router } from '@angular/router';
import { ToastMessageService } from '../../../../common/services/toast-message.service';

@Component({
  selector: 'app-stage-create',
  templateUrl: './stage-create.component.html',
  styleUrls: ['./stage-create.component.scss']
})
export class StageCreateComponent implements OnInit {

  lang='fr';
  timeoutHandler: any;

  public myDatePickerOptions: IMyOptions = {
    // Your options
  };
    
  template=0;
  loc=location.protocol+'//'+location.host;
  noImageUrl=this.loc+'/assets/news/no-image.jpg';
  imageUrl=this.loc+'/assets/news/no-image.jpg';

  stageForm: FormGroup;
  periodes: Array<PeriodeModel>;
  selectedPeriode: PeriodeModel=null;


  image_0_width_v=280;
  image_0_height_v=400;
  image_0_style={ 'width': '280px', 'height': '400px'};

  image_2_width_v=400;
  image_2_height_v=280;
  image_2_style={ 'width': '400px', 'height': '280px'};

  dateDebut: any;
  dateFin: any;

  stageTitre: string;
  stagePresentation: string;

  
  constructor(
    private formBuilder: FormBuilder,
    private localeService: LocaleService,
    private matDialog: MatDialog,
    private periodesService: PeriodesService,
    private router: Router,
    private stagesService: StagesService,
    private toastMessageService: ToastMessageService,
  ) { }

  ngOnInit(): void 
  {
    this.localeService.setLocaleOptions(mdbdatepicker_locales);
    
    this.periodesService.getPeriodes()
      .subscribe(res => this.periodes=res);

    this.buildForm();
  }

  getPeriodesForStages(): Array<PeriodeModel>
  {
    return this.periodes.filter( p => p.isForStages === true);
  }

  buildForm()
  {
    this.stageForm = this.formBuilder.group({
      template: ['0'],
      title: ['', Validators.required],
      presentation: ['', Validators.required],
      avatar: [null],
      image: [''],
      zoom: [false],
      // imageWidth: [''],
      image0Width: ['280'],
      image0Height: ['400'],
      image2Width: ['400'],
      image2Height: ['280'],

      imageZoomWidth: ['380'],
      imageZoomHeight: ['500'],

      periodeId: [''],
      hasTarifUnique: [false],
      tarifUnique: [''],

      byJourneeAllowed: [false],
      byDemiJourneeAllowed: [false],

      tarifMembre: [''],
      tarifNonMembre: [''],
      tarifSupplementNonMembre: [''],
      tarifJutificationSupplementNonMembre: [''],

      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],

      heureDebutMatin:[''],
      heureFinMatin:[''],
      heureDebutApresMidi: [''],
      heureFinApresMidi: [''],

      encadrement: [''],
      sparring: [''],

      hasInscriptionLimit: [false],
      inscriptionLimitCount: [''],

      isAnnulationAllowed: [''],
      dateLimiteAnnulation: ['']
    });
  }

  onDeleteImage()
  {
    this.stageForm.patchValue({
      avatar: null,
      image: null
    });
    this.imageUrl=this.noImageUrl;
  }

  showPreview(event)
  {
    const file = (event.target as HTMLInputElement).files[0];
    this.stageForm.patchValue({
      avatar: file
    });
    this.stageForm.get('avatar').updateValueAndValidity();

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  /*
  imageStyle_0(): string
  {
    return 'width: `{image_0_width_v}`px; height: 400px;';
  }
  */

  onDecreaseImageWidth()
  {
    this.image_0_width_v--;
    this.updateImage0Style();

    console.log('image 0 style', this.image_0_style);

    this.stageForm.patchValue({
      image0Width: this.image_0_width_v,
    });
  }

  onIncreaseImageWidth()
  {
    this.image_0_width_v++;
    this.updateImage0Style();

    console.log('image 0 style', this.image_0_style);

    this.stageForm.patchValue({
      image0Width: this.image_0_width_v,
    });
  }

  onChangeImage0Width()
  {
    const newWidth = +this.stageForm.value.image0Width;
    if(newWidth>0)
    {
      this.image_0_width_v = newWidth;
      this.updateImage0Style();
    }
  } 
  
  onChangeImage2Width()
  {
    const newWidth = +this.stageForm.value.image2Width;
    if(newWidth>0)
    {
      this.image_2_width_v = newWidth;
      this.updateImage2Style();
    }
  }




  onDecreaseImageHeight()
  {
    this.image_0_height_v--;
    this.updateImage0Style();

    console.log('image 0 style', this.image_0_style);

    this.stageForm.patchValue({
      image0Height: this.image_0_height_v,
    });
  }

  onIncreaseImageHeight()
  {
    this.image_0_height_v++;
    this.updateImage0Style();

    console.log('image 0 style', this.image_0_style);

    this.stageForm.patchValue({
      image0Height: this.image_0_height_v,
    });
  }

  onChangeImage0Height()
  {
    const newHeight = +this.stageForm.value.image0Height;
    if(newHeight>0)
    {
      this.image_0_height_v = newHeight;
      this.updateImage0Style();
    }
  }

  onChangeImage2Height()
  {
    const newHeight = +this.stageForm.value.image2Height;
    if(newHeight>0)
    {
      this.image_2_height_v = newHeight;
      this.updateImage2Style();
    }
  }

  private updateImage0Style()
  {
    this.image_0_style={ 'width': this.image_0_width_v+'px', 'height': this.image_0_height_v+'px'};
  }

  private updateImage2Style()
  {
    this.image_2_style={ 'width': this.image_2_width_v+'px', 'height': this.image_2_height_v+'px'};
  }

  isZoomEnabled(): boolean
  {
    const zoom = this.stageForm.value.zoom;
    //console.log('zoom', zoom);
    return zoom;
  }

  isTarifUnique(): boolean
  {
    return this.stageForm.value.hasTarifUnique;
  }

  onChangeImageZoomWidth()
  {

  }

  onChangeImageZoomHeight()
  {

  }

  onTestZoom()
  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '800px';

    dialogConfig.data = {
      image: this.imageUrl,
      width: this.stageForm.value.imageZoomWidth,
      height: this.stageForm.value.imageZoomHeight
    };

    const dialogRef = this.matDialog.open(ImageZoomDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data: {image: any, width: number, height: number} ) => {
      
      if(data!==null)
      {
        console.log('The dialog was closed', data.width, data.height);

        this.stageForm.patchValue({
          imageZoomWidth: data.width,
        });

        this.stageForm.patchValue({
          imageZoomHeight: data.height,
        });
      }
    });
  }

  onTemplateClick(t: number)
  {
    //console.log('template click', event);
    this.template=t;
  }

  public mouseup() 
  {
    if (this.timeoutHandler) {
      clearInterval(this.timeoutHandler);
      this.timeoutHandler = null;
    }
  }

  public mousedown(op: string) 
  {
    if(this.template===0 || this.template===1)
    {
      this.timeoutHandler = setInterval(() => {
        if(op==='dw') this.image_0_width_v--;
        if(op==='iw') this.image_0_width_v++;
        if(op==='dh') this.image_0_height_v--;
        if(op==='ih') this.image_0_height_v++;
        this.stageForm.patchValue({
          image0Width: this.image_0_width_v,
        });
        this.stageForm.patchValue({
          image0Height: this.image_0_height_v,
        });
        this.updateImage0Style();
      }, 100);
    }
    else if(this.template===3)
    {
      this.timeoutHandler = setInterval(() => {
        if(op==='dw') this.image_2_width_v--;
        if(op==='iw') this.image_2_width_v++;
        if(op==='dh') this.image_2_height_v--;
        if(op==='ih') this.image_2_height_v++;
        this.stageForm.patchValue({
          image2Width: this.image_2_width_v,
        });
        this.stageForm.patchValue({
          image2Height: this.image_2_height_v,
        });
        this.updateImage2Style();
      }, 100);
    }
  }

  onPeriodeChanged(event)
  {
    console.log('periode changed:', event);
    console.log('periode changed:', this.stageForm.value.periodeId);
    const periodeId = +this.stageForm.value.periodeId;
    this.selectedPeriode = this.periodes.find( p => p.id === periodeId);
    console.log('periode changed:', this.selectedPeriode);
  }

  onCancel()
  {
    this.router.navigate(['activites','stages']);
  }

  onCreateStage()
  {
    console.log('create stage:', this.stageForm.value);
    const titre=this.stageForm.value.titre;
    this.stagesService.createStage(this.stageForm.value)
      .subscribe(res => {
            console.log('create stage result:', res);
            this.toastMessageService.addSuccess('Création stage', 'Le stage a été créée: '+titre, 5000);
            this.router.navigate(['activites','stages']);
          }
        ,
        err => {
          console.error('unable to create the stage', err);
          if(err.error)
          {
            this.toastMessageService.addError('Création stage', 'Une erreur s\'est produite:'+err.error.message, 11000);
          }
          else
          {
            this.toastMessageService.addError('Création stage', 'Une erreur s\'est produite:'+err.message, 10000);
          }
        }
    );
  }
}
