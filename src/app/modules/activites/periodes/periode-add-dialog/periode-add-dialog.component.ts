import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PeriodesService } from '../services/periodes.service';
import { ToastMessageService } from '../../../../common/services/toast-message.service';
import { IMyOptions, LocaleService } from 'ng-uikit-pro-standard';
import { PeriodeModel } from '../model/periode.model';
import { mdbdatepicker_locales } from '../../../../common/interfaces/mdbdatepicker.locale';

@Component({
  selector: 'app-periode-add-dialog',
  templateUrl: './periode-add-dialog.component.html',
  styleUrls: ['./periode-add-dialog.component.scss']
})
export class PeriodeAddDialogComponent implements OnInit {

  periodeForm: FormGroup;
  datesForm: FormGroup;
  domainesForm: FormGroup;

  lang='fr';

  public myDatePickerOptions: IMyOptions = {
    // Your options
    };

  constructor(
    private dialogRef: MatDialogRef<PeriodeAddDialogComponent>,

    @Inject(MAT_DIALOG_DATA)
    data: {
      title: string,
    },

    private periodesService: PeriodesService,
    private formBuilder: FormBuilder, 
    private toastMessageService: ToastMessageService,
    // MDB PRO Service !
    private localeService: LocaleService,
  ) { }

  static datesValidator(form: FormGroup)
  {
    /*
      const password=form.get('dateDebut').value;
      const passwordcopy=form.get('dateFin').value;
      return password!==passwordcopy ? { matchingError: true} : null;
      */
    const dateDebut: Date = form.get('dateDebut').value;
    const dateFin: Date = form.get('dateFin').value;
    if(dateDebut <= dateFin) return null;
    return { matchingError: true};
  }

  static domainesValidator(form: FormGroup)
  {
    /*
      const password=form.get('dateDebut').value;
      const passwordcopy=form.get('dateFin').value;
      return password!==passwordcopy ? { matchingError: true} : null;
      */
    const isForEntrainements: boolean = form.get('isForEntrainements').value;
    const isForStages: boolean = form.get('isForStages').value;
    if(isForEntrainements===true || isForStages===true) return null;
    return { matchingError: true};
  }

  ngOnInit(): void 
  {
    this.localeService.setLocaleOptions(mdbdatepicker_locales);
    this.prepareForm();
  }

  prepareForm()
  {
    this.datesForm=this.formBuilder.group(
      {
        dateDebut: ['', [Validators.required] ],
        dateFin: ['', [Validators.required] ],
      }
      ,
      {
          validator: PeriodeAddDialogComponent.datesValidator
      }
    );

    this.domainesForm=this.formBuilder.group(
      {
        isForEntrainements: [''],
        isForStages: [''],
      }
      ,
      {
          validator: PeriodeAddDialogComponent.domainesValidator
      }
    );

    this.periodeForm = this.formBuilder.group({
      nom: ['', [Validators.required, Validators.minLength(2)] ],
      description: [''],
      datesForm: this.datesForm,
      domainesForm: this.domainesForm
    });
  }

  onCloseDialog(periode: PeriodeModel) 
  {
    this.dialogRef.close(periode);
  }

  onCancel()
  {
    this.onCloseDialog(null);
  }

  onCreatePeriode()
  {
    console.log('create periode:', this.periodeForm.value);
    const titre=this.periodeForm.value.nom;
    this.periodesService.createPeriode(this.periodeForm.value)
      .subscribe( (periode: PeriodeModel) => {
            console.log('create periode result:', periode);
            this.toastMessageService.addSuccess('Création periode', 'La periode a été créée: '+titre, 5000);
            this.onCloseDialog(periode);
          }
        ,
        err => {
          console.error('unable to create the periode', err);
          if(err.error)
          {
            this.toastMessageService.addError('Création periode', 'Une erreur s\'est produite:'+err.error.message, 11000);
          }
          else
          {
            this.toastMessageService.addError('Création periode', 'Une erreur s\'est produite:'+err.message, 10000);
          }
        }
    );
  }

}
