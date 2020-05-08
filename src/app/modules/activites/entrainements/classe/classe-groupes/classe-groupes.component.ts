import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { EntrainementClasseGroupeModel } from '../../model/entrainement-classe-groupe.model';
import { AuthService } from '../../../../auth/services/auth.service';
import { EntrainementsService } from '../../services/entrainements.service';
import { EntrainementClasseModel } from '../../model/entrainement-classe.model';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ClasseGroupeAddDialogComponent } from '../classe-groupe-add-dialog/classe-groupe-add-dialog.component';
import { PeriodesService } from '../../../periodes/services/periodes.service';
import { PeriodeModel } from '../../../periodes/model/periode.model';
import { ToastMessageService } from '../../../../../common/services/toast-message.service';

@Component({
  selector: 'app-antrainement-classe-groupes',
  templateUrl: './classe-groupes.component.html',
  styleUrls: ['./classe-groupes.component.scss']
})
export class ClasseGroupesComponent implements OnInit {

  classeId: number;
  classe: EntrainementClasseModel;
  
  groupes: Array<EntrainementClasseGroupeModel>;
  
  loc=location.protocol+'//'+location.host;
  noImageUrl=this.loc+'/assets/news/no-image.jpg';
  imageUrl=null;

  isImageLoading = true;
  periodes: Array<PeriodeModel>;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private entrainementsService: EntrainementsService,
    private matDialog: MatDialog,
    private periodesService: PeriodesService,
    private toastMessageService: ToastMessageService,
  ) 
  { }

  ngOnInit(): void 
  {
    this.periodesService.getPeriodes()
      .subscribe(res => this.periodes=res);

    this.activatedRoute.paramMap.subscribe( (params: ParamMap) => {
        this.classeId = +params.get('classeId');
        console.log('Selected classe id:', this.classeId);     
        this.loadData();
      }    
    );
  }

  private loadData()
  {
    this.entrainementsService.getEntrainementClasse(this.classeId)
      .subscribe( classe => {
          this.classe = classe;
          console.log('classe', classe);
          this.loadClasseImage();
        } 
    );

    this.entrainementsService.getEntrainementClasseGroupes(this.classeId)
      .subscribe( groupes => {
          this.groupes = groupes;
          console.log('groupes', groupes);
        } 
    );
  }

  private loadClasseImage()
  {
    if(this.classe.imageFilename===null || this.classe.imageFilename===undefined)
    {
      this.imageUrl=null;
      this.isImageLoading=false;
    }
    else
    {
      console.log('Loading image from server for classe '+ this.classe.id+', image:'+this.classe.imageFilename);
      this.getClasseImageFromService();
    }
  }

  
  private getClasseImageFromService() 
  {
      this.isImageLoading = true;
      this.entrainementsService.downloadClasseImageFile(this.classe).subscribe(data => {
        this.createClasseImageFromBlob(data);
        this.isImageLoading = false;
      }, error => {
        this.isImageLoading = false;
        console.log(error);
      });
  }

  createClasseImageFromBlob(image: Blob) 
  {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        this.imageUrl = reader.result;
      }, false);

      if (image) {
        reader.readAsDataURL(image);
      }
  }

  onAddGroup()
  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '800px';

    dialogConfig.data = {
      title: 'Liste des forces Messieurs',
      classe: this.classe,
      periodes: this.periodes.filter( p => p.isForEntrainements === true)
    };

    if(dialogConfig.data.periodes === null || dialogConfig.data.periodes ===undefined )
    {
      this.toastMessageService.addWarn('Création groupe refusée!', 'Veuillez définir au moins une période compatible avec des entraînements!');
      return;
    }

    const dialogRef = this.matDialog.open(ClasseGroupeAddDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((groupe: EntrainementClasseGroupeModel) => {
      console.log('The dialog was closed');
      //this.animal = result;
      console.log('dialog result', groupe);
      if(groupe!==null)
      {
        this.addGroupeToList(groupe);
      }
    });

  }

  private addGroupeToList(groupe: EntrainementClasseGroupeModel)
  {
    const list=this.groupes;
    list.push(groupe);
    list.sort( (g1, g2) => {
      if(g1.showOrder < g2.showOrder) return -1;
      if(g1.showOrder > g2.showOrder) return +1;
      return 0;
    });
    this.groupes=list;
  }
}
