import { Component, OnInit } from '@angular/core';
import { PeriodesService } from '../services/periodes.service';
import { PeriodeModel } from '../model/periode.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PeriodeAddDialogComponent } from '../periode-add-dialog/periode-add-dialog.component';

@Component({
  selector: 'app-periodes',
  templateUrl: './periodes.component.html',
  styleUrls: ['./periodes.component.scss']
})
export class PeriodesComponent implements OnInit {

  periodes: Array<PeriodeModel>;
  
  constructor(
    private matDialog: MatDialog,
    private periodesService: PeriodesService,
  ) { }

  ngOnInit(): void 
  {
    this.periodesService.getPeriodes()
      .subscribe(res => this.periodes=res);
  }

  onAddPeriod()
  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '800px';

    dialogConfig.data = {
      title: 'Création d\'unepériode d\'activités',
    };

    const dialogRef = this.matDialog.open(PeriodeAddDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((periode: PeriodeModel) => {
      console.log('The dialog was closed');
      //this.animal = result;
      console.log('dialog result', periode);
      if(periode!==null)
      {
        this.addPeriodeToList(periode);
      }
    });
  }

  addPeriodeToList(periode: PeriodeModel)
  {
    const list=this.periodes;
    list.push(periode);
    list.sort((p1, p2) => {
      if(p1.dateDebut < p2.dateDebut) return -1;
      if(p1.dateDebut > p2.dateDebut) return +1;
      if(p1.nom < p2.nom) return -1;
      if(p1.nom > p2.nom) return +1;
      return 0;
    } );
  }
}
