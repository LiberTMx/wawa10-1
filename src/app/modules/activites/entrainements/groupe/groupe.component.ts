import { Component, OnInit, Input } from '@angular/core';
import { EntrainementClasseModel } from '../model/entrainement-classe.model';
import { EntrainementClasseGroupeModel } from '../model/entrainement-classe-groupe.model';
import { EntrainementsService } from '../services/entrainements.service';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { EntrainementGroupeSeanceModel } from '../model/entrainement-groupe-seance.model';
import { PeriodesService } from '../../periodes/services/periodes.service';
import { SeanceAddDialogComponent } from './seance-add-dialog/seance-add-dialog.component';

@Component({
  selector: 'app-entrainement-classe-groupe',
  templateUrl: './groupe.component.html',
  styleUrls: ['./groupe.component.scss']
})
export class GroupeComponent implements OnInit {

  @Input()
  classe: EntrainementClasseModel;

  @Input()
  groupe: EntrainementClasseGroupeModel;
  
    
  loc=location.protocol+'//'+location.host;
  noImageUrl=this.loc+'/assets/news/no-image.jpg';
  imageUrl=null;

  isImageLoading = true;

  
  seances: Array<EntrainementGroupeSeanceModel>;

  constructor(
    private entrainementsService: EntrainementsService,
    private matDialog: MatDialog,
    private periodesService: PeriodesService,
  ) { }

  ngOnInit(): void 
  {
    if(this.groupe!==null && this.groupe!==undefined)
    {
      this.entrainementsService.getEntrainementGroupeSeances(this.groupe.id)
        .subscribe( seances => this.seances = seances);

      if(this.groupe.imageFilename===null || this.groupe.imageFilename===undefined)
      {
        this.imageUrl=null;
        this.isImageLoading=false;
      }
      else
      {
        console.log('Loading image from server for classe '+ this.groupe.id+', image:'+this.groupe.imageFilename);
        this.getImageFromService();
      }
    }
  }

  getImageFromService() 
  {
      this.isImageLoading = true;
      this.entrainementsService.downloadClasseGroupeImageFile(this.groupe).subscribe(data => {
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

  onAddGroupHoraire()
  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '800px';

    dialogConfig.data = {
      title: 'Ajout séance',
      classe: this.classe,
      groupe: this.groupe
    };

    const dialogRef = this.matDialog.open(SeanceAddDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((seance: EntrainementGroupeSeanceModel) => {
      console.log('The dialog was closed');
      //this.animal = result;
      console.log('dialog result', seance);
      if(seance!==null)
      {
        //this.addGroupeToList(groupe);
      }
    });
  }
}
