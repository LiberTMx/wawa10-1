import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EntrainementClasseGroupeModel } from '../../model/entrainement-classe-groupe.model';
import { EntrainementGroupeSeanceModel } from '../../model/entrainement-groupe-seance.model';
import { EntrainementClasseModel } from '../../model/entrainement-classe.model';
import { EntrainementsService } from '../../services/entrainements.service';
import { IMyOptions } from 'ng-uikit-pro-standard';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PeriodeModel } from '../../../periodes/model/periode.model';
import { ListeService } from '../../../../../common/services/liste.service';
import { KvpModel } from '../../../../../common/model/kvp.model';
import { ToastMessageService } from '../../../../../common/services/toast-message.service';

@Component({
  selector: 'app-seance-add-dialog',
  templateUrl: './seance-add-dialog.component.html',
  styleUrls: ['./seance-add-dialog.component.scss']
})
export class SeanceAddDialogComponent implements OnInit {

  lang='fr';

  public myDatePickerOptions: IMyOptions = {
    // Your options
    };
    
  dialogData: {
    title: string,
    periodes: Array<PeriodeModel>,
    classe: EntrainementClasseModel,
    groupe: EntrainementClasseGroupeModel
  };

  seanceForm: FormGroup;
  
  jours = this.listeService.joursForMDBSelect();

  constructor(
    private dialogRef: MatDialogRef<SeanceAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    data: {
      title: string, 
      periodes: Array<PeriodeModel>,
      classe: EntrainementClasseModel,
      groupe: EntrainementClasseGroupeModel
    },

    private entrainementsService: EntrainementsService,
    private formBuilder: FormBuilder, 
    private listeService: ListeService,
    private toastMessageService: ToastMessageService,
  ) 
  { 
    this.dialogData = data;
  }

  ngOnInit(): void 
  {
    this.prepareForm();
  }

  prepareForm()
  {
    this.seanceForm = this.formBuilder.group({
      titre: [this.dialogData.groupe.titre, [Validators.required, Validators.minLength(2)] ],
      presentation: [''],
      jourIndex: ['', [Validators.required] ],
      heureDebut: ['', [Validators.required] ],
      heureFin: ['', [Validators.required] ],
      groupeId: this.dialogData.groupe.id,
      classeId: this.dialogData.classe.id
    });
  }

  onCloseDialog(result?: EntrainementGroupeSeanceModel) 
  {
    this.dialogRef.close(result);
  }

  onCancel()
  {
    this.onCloseDialog();
  }

  onCreateSeance()
  {
    console.log('creating séance', this.seanceForm.value);
    const titre=this.seanceForm.value.titre;
    this.entrainementsService.createGroupeSeance(this.seanceForm.value)
      .subscribe( (seance: EntrainementGroupeSeanceModel) => {
            console.log('create seance result:', seance);
            this.toastMessageService.addSuccess('Création séance', 'La séance a été créée: '+titre, 5000);
            this.onCloseDialog(seance);
          }
        ,
        err => {
          console.error('unable to create the séance', err);
          if(err.error)
          {
            this.toastMessageService.addError('Création séance', 'Une erreur s\'est produite:'+err.error.message, 11000);
          }
          else
          {
            this.toastMessageService.addError('Création séance', 'Une erreur s\'est produite:'+err.message, 10000);
          }
        }
    );

  }
}
