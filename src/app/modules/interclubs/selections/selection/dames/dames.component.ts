import { Component, OnInit, Input } from '@angular/core';
import { InterclubsSemaineModel } from '../../model/interclubs-semaine.model';
import { InterclubsLDF } from '../../model/interclubs-ldf.model';
import { InterclubsTeamModel } from '../../model/interclubs-team.model';
import { InterclubsMatchModel } from '../../model/interclubs-match.model';
import { InterclubsCategoryModel } from '../../model/interclubs-category.model';
import { InterclubsSemaineVersionModel } from '../../model/interclubs-semaine-version.model';
import { SelectionService } from '../../services/selection.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ToastMessageService } from '../../../../../common/services/toast-message.service';
import { InterclubsLdfParticipantModel } from '../../model/interclubs-ldf-participant.model';
import { InterclubsLdfByCategoryModel } from '../../model/interclubs-ldf-by-category.model';
import { MatSelectChange } from '@angular/material/select';
import { InterclubsSelectionModel } from '../../model/interclubs-selection.model';
import { SelectionValidationDialogComponent } from '../../../selection-validation-dialog/selection-validation-dialog.component';

@Component({
  selector: 'app-interclubs-selections-dames',
  templateUrl: './dames.component.html',
  styleUrls: ['./dames.component.scss']
})
export class DamesComponent implements OnInit {

  @Input()
  semaines: Array<InterclubsSemaineModel>;
  
  @Input()
  listeDesForces: Array<InterclubsLDF>;
  
  @Input()
  teams: Array<InterclubsTeamModel>;

  @Input()
  matches: Array<InterclubsMatchModel>;
  
  @Input()
  interclubCategory: InterclubsCategoryModel;
  
  selectedSemaine: InterclubsSemaineModel=null;
  selectedTeam: InterclubsTeamModel=null;
  selectedMatch: InterclubsMatchModel = null;

  loading=true;
  selectedLdfRow =-1;
  selectedJoueur: InterclubsLDF=null;

  semaineVersions: Array<InterclubsSemaineVersionModel> = null;

  selectionForm: FormGroup;
  selectionsMap: Map<number, InterclubsLDF> = new Map<number, InterclubsLDF>();
  //storedSelectionsMap: Map<number, InterclubsSelectionModel> = new Map<number, InterclubsSelectionModel>();
  //selectionsReserveMap: Map<number, InterclubsLDF> = new Map<number, InterclubsLDF>();

  selectedSemaineVersion: InterclubsSemaineVersionModel;

  emptyPlayer: InterclubsLDF;

  constructor(
    private selectionService: SelectionService,
    private formBuilder: FormBuilder,
    private matDialog: MatDialog,
    private toastMessageService: ToastMessageService,
  ) { }

  ngOnInit(): void 
  {
    this.buildEmptyPlayer();
    
    //console.log('Liste des forces - Hommes:', this.listeDesForces);
    console.log('Liste des matches - Hommes:', this.matches);
    this.prepareSelectionForm();
  }

  buildEmptyPlayer()
  {
    /*
    constructor(
      public participant: InterclubsLdfParticipantModel,
      public listeDeForce: InterclubsLdfByCategoryModel
    ) {}*/

    const participant=new InterclubsLdfParticipantModel();
    participant.nom='';
    participant.prenom='';
    const ldf=new InterclubsLdfByCategoryModel();
    this.emptyPlayer=new InterclubsLDF(participant, ldf, true);

  }

  prepareSelectionForm()
  {
    this.selectionForm = this.formBuilder.group({
      j1_nom_prenom:[''],
      j1_indice:[''],
      j1_classement: [''],
      
      j2_nom_prenom:[''],
      j2_indice:[''],
      j2_classement: [''],

      j3_nom_prenom:[''],
      j3_indice:[''],
      j3_classement: [''],

      j4_nom_prenom:[''],
      j4_indice:[''],
      j4_classement: [''],
     
      r1_nom_prenom:[''],
      r1_indice:[''],
      r1_classement: [''],
      
      r2_nom_prenom:[''],
      r2_indice:[''],
      r2_classement: [''],

      r3_nom_prenom:[''],
      r3_indice:[''],
      r3_classement: [''],

      r4_nom_prenom:[''],
      r4_indice:[''],
      r4_classement: [''],
    });
  }
  
  onChangeSemaine(event: MatSelectChange)
  {
    this.selectedSemaine = event.value;
    console.log('semaine sélectionnée:', this.selectedSemaine);
    this.selectionService.getSemaineVersions(this.selectedSemaine)
      .subscribe(res =>this.semaineVersions =res);

  }

  onChangeTeam(event: MatSelectChange)
  {
    this.selectedTeam = event.value;
    console.log('équipe sélectionnée:', this.selectedTeam);
    this.selectedMatch = this.matches.find( m => 
      m.WeekName === this.selectedSemaine.weekName
      && ( m.homeTeamId === this.selectedTeam.TeamId || m.awayTeamId === this.selectedTeam.TeamId ) 
    );
    console.log('selected match', this.selectedMatch);
    // Load the previuous seletions
    this.selectionService.getSelection(this.selectedMatch, this.selectedSemaineVersion)
      .subscribe(
        (res: Array<InterclubsSelectionModel>) => {
          // empty the form
          this.selectedJoueur=this.emptyPlayer;
          for(let ix=1; ix<=8; ix++)
          {
            this.updateSelectionOnForm(ix);
          }

          for(const sel of res)
          {
            // this.updateSelectionOnForm(index);
            this.selectedJoueur = this.listeDesForces.find( p => p.participant.authUserId === sel.auth_user_id);
            const index=sel.position;
            this.updateSelectionOnForm(index);
          }

          this.selectedJoueur=null;
        }
      );
  }

  setClickedLdfRow(index: number, item: InterclubsLDF)
  {
    console.log('ldf row clicked', index, item);
    this.selectedLdfRow=index;
    this.selectedJoueur=item;
  }

  onSemaineNextVersion(){
    this.selectionService.getSemaineNextVersion(this.selectedSemaine)
      .subscribe( res => this.semaineVersions=res);
  }

  onSelectionJoueur(index: number)
  {
    if(this.selectedSemaineVersion===null 
        || this.selectedSemaineVersion===undefined 
        || (this.selectedSemaineVersion.semaine_version_statut!=='working' && this.selectedSemaineVersion.semaine_version_statut!=='published') ) 
    {
      this.toastMessageService.addError('Selection', 'Vous devez sélectionner une version working oou published',11000);
      return;
    }
    if(this.selectedMatch===null || this.selectedMatch===undefined) 
    {
      this.toastMessageService.addError('Selection', 'Vous devez sélectionner un match',11000);
      return;
    }
    if(this.selectedJoueur===null || this.selectedJoueur===undefined) {
      this.toastMessageService.addError('Selection', 'Vous devez sélectionner un joueur',11000);
      return;
    }

    if( ! this.selectedJoueur.allowed)
    {
      this.toastMessageService.addError('Selection REJETEE', 'Veuillez d\'abord définir une fiche membre pour ce joueur!',11000);
      return;
    }

    this.selectionsMap.set(index, this.selectedJoueur);

    this.selectionService.storeSelection(this.selectedJoueur, this.selectedMatch, index, this.selectedSemaineVersion)
    
      .subscribe(
        res => {
            console.log('selection stored', res);
            //this.storedSelectionsMap.set(index, res);
            this.updateSelectionOnForm(index);
            this.toastMessageService.addSuccess('Selection', this.selectedJoueur.participant.prenom+ ' a été sélectionné');
          }
        ,
        err => {
          console.error('unable to create the selection', err);
          if(err.error)
          {
            this.toastMessageService.addError('Selection', 'Une erreur s\'est produite:'+err.error.message, 11000);
          }
          else
          {
            this.toastMessageService.addError('Selection', 'Une erreur s\'est produite:'+err.message, 11000);
          }
        }
 
     );
    // s'assurer qu'un joueur a ete selectionner: this.selectJoueur !== null
    // s'assurer qu'il n'y a pas encore de joueur sélectionné à la place selectionnée
    // si oui: pre-requis:supprimer le joueur dejà selectionné à cette place
    // enregistrer la selection ds le backend
    // verifier la reponse du backend
    // si tout est ok , placer le joueur ds la grille
    
  }

  onSelectionReserve(index: number)
  {
    if(this.selectedJoueur===null || this.selectedJoueur===undefined) return;

    //$$this.selectionsReserveMap.set(index, this.selectedJoueur);

    this.selectionService.storeReserve(this.selectedJoueur, this.selectedMatch, index)
      .subscribe(
        res => {
            console.log('selection stored');
            this.updateSelectionReserveOnForm(index);
          }
        ,
        err => console.error(err)
      
     );
    // s'assurer qu'un joueur a ete selectionner: this.selectJoueur !== null
    // s'assurer qu'il n'y a pas encore de joueur sélectionné à la place selectionnée
    // si oui: pre-requis:supprimer le joueur dejà selectionné à cette place
    // enregistrer la selection ds le backend
    // verifier la reponse du backend
    // si tout est ok , placer le joueur ds la grille
    
  }

  private updateSelectionOnForm(index: number)
  {
    switch(index)
    {
      case 1: 
        {
          this.selectionForm.patchValue({
            j1_nom_prenom: this.selectedJoueur.participant.nom + ' ' + this.selectedJoueur.participant.prenom,
            j1_indice: this.selectedJoueur.listeDeForce.rankingIndex,
            j1_classement: this.selectedJoueur.listeDeForce.classement,
          });
        }
        break;
        case 2: 
        {
          this.selectionForm.patchValue({
            j2_nom_prenom: this.selectedJoueur.participant.nom + ' ' + this.selectedJoueur.participant.prenom,
            j2_indice: this.selectedJoueur.listeDeForce.rankingIndex,
            j2_classement: this.selectedJoueur.listeDeForce.classement,
          });
        }
        break;
        case 3: 
        {
          this.selectionForm.patchValue({
            j3_nom_prenom: this.selectedJoueur.participant.nom + ' ' + this.selectedJoueur.participant.prenom,
            j3_indice: this.selectedJoueur.listeDeForce.rankingIndex,
            j3_classement: this.selectedJoueur.listeDeForce.classement,
          });
        }
        break;
        case 4: 
        {
          this.selectionForm.patchValue({
            j4_nom_prenom: this.selectedJoueur.participant.nom + ' ' + this.selectedJoueur.participant.prenom,
            j4_indice: this.selectedJoueur.listeDeForce.rankingIndex,
            j4_classement: this.selectedJoueur.listeDeForce.classement,
          });
        }
        break;

        ///////////////// RESERVES
        case 5: 
        {
          this.selectionForm.patchValue({
            r1_nom_prenom: this.selectedJoueur.participant.nom + ' ' + this.selectedJoueur.participant.prenom,
            r1_indice: this.selectedJoueur.listeDeForce.rankingIndex,
            r1_classement: this.selectedJoueur.listeDeForce.classement,
          });
        }
        break;
        case 6: 
        {
          this.selectionForm.patchValue({
            r2_nom_prenom: this.selectedJoueur.participant.nom + ' ' + this.selectedJoueur.participant.prenom,
            r2_indice: this.selectedJoueur.listeDeForce.rankingIndex,
            r2_classement: this.selectedJoueur.listeDeForce.classement,
          });
        }
        break;
        case 7: 
        {
          this.selectionForm.patchValue({
            r3_nom_prenom: this.selectedJoueur.participant.nom + ' ' + this.selectedJoueur.participant.prenom,
            r3_indice: this.selectedJoueur.listeDeForce.rankingIndex,
            r3_classement: this.selectedJoueur.listeDeForce.classement,
          });
        }
        break;
        case 8: 
        {
          this.selectionForm.patchValue({
            r4_nom_prenom: this.selectedJoueur.participant.nom + ' ' + this.selectedJoueur.participant.prenom,
            r4_indice: this.selectedJoueur.listeDeForce.rankingIndex,
            r4_classement: this.selectedJoueur.listeDeForce.classement,
          });
        }
        break;
    }
  }

  updateSelectionReserveOnForm(index: number)
  {
    // s'assurer qu'un joueur a ete selectionner: this.selectJoueur !== null
    // s'assurer qu'il n'y a pas encore de joueur sélectionné à la place selectionnée
    // si oui: pre-requis:supprimer le joueur dejà selectionné à cette place
    // enregistrer la selection ds le backend
    // verifier la reponse du backend
    // si tout est ok , placer le joueur ds la grille
    switch(index)
    {
      case 1: 
        {
          this.selectionForm.patchValue({
            r1_nom_prenom: this.selectedJoueur.participant.nom + ' ' + this.selectedJoueur.participant.prenom,
            r1_indice: this.selectedJoueur.listeDeForce.rankingIndex,
            r1_classement: this.selectedJoueur.listeDeForce.classement,
          });
        }
        break;
        case 2: 
        {
          this.selectionForm.patchValue({
            r2_nom_prenom: this.selectedJoueur.participant.nom + ' ' + this.selectedJoueur.participant.prenom,
            r2_indice: this.selectedJoueur.listeDeForce.rankingIndex,
            r2_classement: this.selectedJoueur.listeDeForce.classement,
          });
        }
        break;
        case 3: 
        {
          this.selectionForm.patchValue({
            r3_nom_prenom: this.selectedJoueur.participant.nom + ' ' + this.selectedJoueur.participant.prenom,
            r3_indice: this.selectedJoueur.listeDeForce.rankingIndex,
            r3_classement: this.selectedJoueur.listeDeForce.classement,
          });
        }
        break;
        case 4: 
        {
          this.selectionForm.patchValue({
            r4_nom_prenom: this.selectedJoueur.participant.nom + ' ' + this.selectedJoueur.participant.prenom,
            r4_indice: this.selectedJoueur.listeDeForce.rankingIndex,
            r4_classement: this.selectedJoueur.listeDeForce.classement,
          });
        }
        break;
      }
  }

  onChangeSemaineVersion(event)
  {

  }

  onDeleteSelectionJoueur(index: number)
  {
    const data = this.selectionsMap.get(index);
    this.selectionService.deleteSelection(this.selectedMatch, index, this.selectedSemaineVersion)
      .subscribe(
        res => {
          this.selectedJoueur = this.emptyPlayer;
          this.updateSelectionOnForm(index);
          this.selectionsMap.set(index, null);
        }
      );
  }

  onSemaineVersionValidate()
  {
    // Il faut avoir une semaine active et en mode working !
    if(this.selectedSemaineVersion===null 
      || this.selectedSemaineVersion===undefined 
      || (this.selectedSemaineVersion.semaine_version_statut!=='working' && this.selectedSemaineVersion.semaine_version_statut!=='published')) 
    {
      this.toastMessageService.addError('Validation des sélections', 'Vous devez sélectionner une version working ou published',11000);
      return;
    }

    // this.router.navigate(['interclubs', 'selections', 'validate', this.interclubCategory.id, this.selectedSemaine.id, this.selectedSemaineVersion.id]);

    const matches = this.matches.filter( m => m.WeekName === this.selectedSemaine.weekName );

    const infos: {
          interclubCategory: InterclubsCategoryModel, 
          selectedSemaine: InterclubsSemaineModel, 
          selectedSemaineVersion: InterclubsSemaineVersionModel,
          teams: Array<InterclubsTeamModel>, 
          matches: Array<InterclubsMatchModel>,
          listeDesForces: Array<InterclubsLDF>
        }
      = { 
        interclubCategory: this.interclubCategory, 
        selectedSemaine: this.selectedSemaine, 
        selectedSemaineVersion: this.selectedSemaineVersion,
        teams: this.teams,
        matches,
        listeDesForces: this.listeDesForces,
    };

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '800px';

    dialogConfig.data = infos;

    const dialogRef = this.matDialog.open(SelectionValidationDialogComponent, dialogConfig);

    /*
    dialogRef.afterClosed().subscribe((groupe: EntrainementClasseGroupeModel) => {
      console.log('The dialog was closed');
      //this.animal = result;
      console.log('dialog result', groupe);
      if(groupe!==null)
      {
        this.addGroupeToList(groupe);
      }
    });
    */

  }


  onSemainePublishVersion()
  {
    if(this.selectedSemaineVersion===null 
        || this.selectedSemaineVersion===undefined 
        || this.selectedSemaineVersion.semaine_version_statut!=='working'  ) 
    {
      this.toastMessageService.addError('Selection', 'Vous ne pouvez publier qu\'une version working ',11000);
      return;
    }

    this.selectionService.publishSemaineVersion(this.selectedSemaineVersion)
      .subscribe(
        res => {
          // replace the working by published
          this.selectionService.getSemaineVersions(this.selectedSemaine)
            .subscribe(res2 =>this.semaineVersions =res2);
          this.toastMessageService.addError('Selections Publiées', 'Le semaine ... a été publiée',11000);
        }
      );
  }

  onValidateNextVersion()
  {
  }


}
