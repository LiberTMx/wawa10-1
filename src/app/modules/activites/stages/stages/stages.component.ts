import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stages',
  templateUrl: './stages.component.html',
  styleUrls: ['./stages.component.scss']
})
export class StagesComponent implements OnInit {

  showModal: boolean;
  panelOpenState = false;

  stages: any=null;
  
  constructor() { }

  ngOnInit(): void {
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


}
