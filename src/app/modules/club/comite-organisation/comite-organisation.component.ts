import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { AuthenticatedUserModel } from '../../auth/model/authenticated-user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comite-organisation',
  templateUrl: './comite-organisation.component.html',
  styleUrls: ['./comite-organisation.component.scss']
})
export class ComiteOrganisationComponent implements OnInit {

  //connectedUser: AuthenticatedUserModel = null;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void 
  {
    //this.connectedUser=this.authService.getCurrentUser();
  }

  isConnectedUserClubAdmin()
  {
    return this.authService.isUserClubAdmin();
  }

  onUpdateClubOrganisation()
  {
    this.router.navigate(['club', 'organisation', 'update']);
  }

}
