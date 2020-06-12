import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { EntrainementsService } from '../services/entrainements.service';
import { EntrainementClasseModel } from '../model/entrainement-classe.model';
import { ClasseStatusType } from '../enums/classe-status.enum';

@Component({
  selector: 'app-entrainements',
  templateUrl: './entrainements.component.html',
  styleUrls: ['./entrainements.component.scss']
})
export class EntrainementsComponent implements OnInit {

  classes: Array<EntrainementClasseModel>;
  classesToDisplay: Array<EntrainementClasseModel> = null;
  
  showHiddenClasses=false;

  constructor(
    private authService: AuthService,
    private entrainementsService: EntrainementsService,
    private router: Router,
  ) { }

  ngOnInit(): void 
  {
    console.log('Visible', ClasseStatusType.VISIBLE);
    console.log('Visible toString', ClasseStatusType.VISIBLE.toString() );
    console.log('Visible toString', ClasseStatusType.VISIBLE.toUpperCase() );

    this.entrainementsService.getEntrainementClasses(this.authService.isUserClubAdmin())
      .subscribe( classes => {
          this.classes = classes;
          console.log('classes', classes);
          this.filterClasses();
        } 
    );
  }

  onShowHiddenClasses(show: boolean)
  {
    this.showHiddenClasses = show;
    this.filterClasses();
  }

  filterClasses()
  {
    this.classesToDisplay=null;

    if(this.classes!==null && this.classes!==undefined && this.classes.length>0)
    {
      let clas: Array<EntrainementClasseModel> = new Array<EntrainementClasseModel>();

      clas = this.classes.filter( c => 
         (this.showHiddenClasses === true) 
              ? true
              : (c.status === ClasseStatusType.VISIBLE || c.status === ClasseStatusType.VISIBLE.toUpperCase() )
      );

      clas.sort( (c1: EntrainementClasseModel, c2: EntrainementClasseModel) => {
          if(c1.showOrder < c2.showOrder ) return -1;
          if(c1.showOrder > c2.showOrder ) return +1;
          return 0;
        } 
      );

      this.classesToDisplay = clas;
    }


/*     if( this.isUserClubAdmin() )
    {

    }
    else
    {
      this.classesToDisplay=this.classes;
    } */
  }

  isUserClubAdmin(): boolean
  {
    return this.authService.isUserClubAdmin();
  }

  onCreateNewClass()
  {
    this.router.navigate(['activites', 'entrainements', 'classe-create']);
  }
}
