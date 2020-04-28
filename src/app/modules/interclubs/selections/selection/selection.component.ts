import { Component, OnInit } from '@angular/core';
import { InterclubsSemaineModel } from '../model/interclubs-semaine.model';
import { SelectionService } from '../services/selection.service';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss']
})
export class SelectionComponent implements OnInit {
  
  semaines: InterclubsSemaineModel[];

  constructor(
    private selectionService: SelectionService,
    ) { }

  ngOnInit(): void {

    this.selectionService.getInterclubsSemaineByInterclubType(null)
      .subscribe(
        res => this.semaines = res
        , 
        error => console.error (error)
        ,
        () => {
          console.log('semaines terminee');
          const x = +1;
        }
      )
    ;
  }

}
