import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { EntrainementsService } from '../services/entrainements.service';
import { EntrainementClasseModel } from '../model/entrainement-classe.model';

@Component({
  selector: 'app-entrainements',
  templateUrl: './entrainements.component.html',
  styleUrls: ['./entrainements.component.scss']
})
export class EntrainementsComponent implements OnInit {

  classes: Array<EntrainementClasseModel>;

  constructor(
    private authService: AuthService,
    private entrainementsService: EntrainementsService,
    private router: Router,
  ) { }

  ngOnInit(): void 
  {
    this.entrainementsService.getEntrainementClasses(this.authService.isUserClubAdmin())
      .subscribe( classes => {
          this.classes = classes;
          console.log('classes', classes);
        } 
    );
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
