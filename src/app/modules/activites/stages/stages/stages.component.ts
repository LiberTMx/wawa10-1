import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { AuthenticatedUserModel } from '../../../auth/model/authenticated-user.model';

@Component({
  selector: 'app-stages',
  templateUrl: './stages.component.html',
  styleUrls: ['./stages.component.scss']
})
export class StagesComponent implements OnInit {

  showModal: boolean;
  panelOpenState = false;

  stages: any=null;
  connectedUser: AuthenticatedUserModel;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void 
  {
    this.connectedUser=this.authService.getCurrentUser();
  }

  isUserStageAdmin(): boolean
  {
    return this.authService.isUserClubAdmin() || this.authService.isUserStageAdmin();
  }

  show(event)
  {
    this.showModal = true; // Show-Hide Modal Check
    return false;
  }
  //Bootstrap Modal Close event
  hide(event)
  {
    this.showModal = false;
    return false; 
  }


  onShowContactForm()
  {
    this.router.navigate(['contact', 'form']);
  }


}
