import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-stage-presentation',
  templateUrl: './stage-presentation.component.html',
  styleUrls: ['./stage-presentation.component.scss']
})
export class StagePresentationComponent implements OnInit {

  @Input()
  stage: any;
  
  constructor() { }

  ngOnInit(): void {
  }

}
