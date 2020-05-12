import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EntrainementClasseModel } from '../../model/entrainement-classe.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GroupeStatusType } from '../../enums/groupe-status.enum';
import { AppUtils } from '../../../../../common/utils/AppUtils';
import { KvpModel } from '../../../../../common/model/kvp.model';
import { EntrainementsService } from '../../services/entrainements.service';
import { ToastMessageService } from '../../../../../common/services/toast-message.service';
import { EntrainementClasseGroupeModel } from '../../model/entrainement-classe-groupe.model';
import { PeriodeModel } from '../../../periodes/model/periode.model';
import { ListeService } from '../../../../../common/services/liste.service';

@Component({
  selector: 'app-classe-groupe-add-dialog',
  templateUrl: './classe-groupe-add-dialog.component.html',
  styleUrls: ['./classe-groupe-add-dialog.component.scss']
})
export class ClasseGroupeAddDialogComponent implements OnInit {

  dialogData: {
    title: string,
    classe: EntrainementClasseModel,
    periodes: Array<PeriodeModel>,
  };

  groupeForm: FormGroup;

  groupeStatus: Array<KvpModel>=AppUtils.stringEnumToKeyValue(GroupeStatusType);

  loc=location.protocol+'//'+location.host;
  noImageUrl=this.loc+'/assets/news/no-image.jpg';
  imageUrl=this.loc+'/assets/news/no-image.jpg';

  

  constructor(
    private dialogRef: MatDialogRef<ClasseGroupeAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    data: {
      title: string, 
      classe: EntrainementClasseModel,
      periodes: Array<PeriodeModel>,
    },
    private entrainementsService: EntrainementsService,
    private formBuilder: FormBuilder, 
    
    private toastMessageService: ToastMessageService,
  ) 
  {
    this.dialogData = data;
    console.log('membres', data);
  }

  ngOnInit(): void 
  {
    this.prepareForm();
  }

  prepareForm()
  {
    this.groupeForm = this.formBuilder.group({
      titre: ['', [Validators.required, Validators.minLength(2)] ],
      presentation: ['', [Validators.required, Validators.minLength(1)] ],
      status: [''],
      showOrder: [''],
      limiteAge: [''],
      limiteClassement: [''],
      avatar: [null],
      image: [''],
      periodeId: ['', [Validators.required] ],
    });
  }

  onDeleteImage()
  {
    this.groupeForm.patchValue({
      avatar: null,
      image: null
    });
    this.imageUrl=this.noImageUrl;
  }

  showPreview(event)
  {
    const file = (event.target as HTMLInputElement).files[0];
    this.groupeForm.patchValue({
      avatar: file
    });
    this.groupeForm.get('avatar').updateValueAndValidity();

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onCloseDialog(groupe: EntrainementClasseGroupeModel) 
  {
    this.dialogRef.close(groupe);
  }

  onCancel()
  {
    this.onCloseDialog(null);
  }

  onCreateGroupe()
  {
    console.log('create groupe:', this.groupeForm.value);
    const titre=this.groupeForm.value.titre;
    this.entrainementsService.createClasseGroupe(this.dialogData.classe.id, this.groupeForm.value)
      .subscribe( (groupe: EntrainementClasseGroupeModel) => {
            console.log('create groupe result:', groupe);
            this.toastMessageService.addSuccess('Création groupe', 'Le groupe a été créé: '+titre, 5000);
            this.onCloseDialog(groupe);
          }
        ,
        err => {
          console.error('unable to create the groupe', err);
          if(err.error)
          {
            this.toastMessageService.addError('Création groupe', 'Une erreur s\'est produite:'+err.error.message, 11000);
          }
          else
          {
            this.toastMessageService.addError('Création groupe', 'Une erreur s\'est produite:'+err.message, 10000);
          }
        }
    );
  }
}
