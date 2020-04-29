import { Component, OnInit } from '@angular/core';
import { InterclubsSemaineModel } from '../model/interclubs-semaine.model';
import { SelectionService } from '../services/selection.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { InterclubsCategoryModel } from '../model/interclubs-category.model';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss']
})
export class SelectionComponent implements OnInit {
  
  semaines: InterclubsSemaineModel[];
  selectedInterclubCategoryId: number;

  selectedInterclubCategory: InterclubsCategoryModel;
  
  loading=true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private selectionService: SelectionService,
    ) { }

  ngOnInit(): void {

    //this.selectedInterclubCategoryId = +this.activatedRoute.snapshot.paramMap.get('id');

    /*
    this.activatedRoute.params
      .subscribe(params => {
        this.selectedInterclubCategoryId  = +this.activatedRoute.snapshot.paramMap.get('id');
    });
    */
    this.loading=true;

    this.activatedRoute.paramMap.subscribe((params: ParamMap)=> {  
      this.selectedInterclubCategoryId= +params.get('id');  
      this.selectionService.setSelectedInterclubCategory(this.selectedInterclubCategoryId);
      this.selectedInterclubCategory = this.selectionService.findInterclubCategoryById(this.selectedInterclubCategoryId);
    }); 

    console.log('selected cat:', this.selectedInterclubCategoryId);


    this.selectionService.getInterclubsSemaineByInterclubType(null)
      .subscribe(
        res => this.semaines = res
        , 
        error => console.error (error)
        ,
        () => {
          console.log('semaines terminee');
          this.loading=false;
        }
      )
    ;
  }

  getFilteredSemaineByInterclubCategory(category: InterclubsCategoryModel): Array<InterclubsSemaineModel>
  {
    if(this.semaines===null || this.semaines===undefined) return null;
    return this.semaines.filter( s => s.afftDivisionCategoryId === category.playerCategory );
  }
}
