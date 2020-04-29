import { Component, OnInit } from '@angular/core';
import { InterclubsSemaineModel } from '../model/interclubs-semaine.model';
import { SelectionService } from '../services/selection.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { InterclubsCategoryModel } from '../model/interclubs-category.model';
import { InterclubsTeamModel } from '../model/interclubs-team.model';
import { InterclubsDivisionModel } from '../model/interclubs-division.model';
import { InterclubsMatchModel } from '../model/interclubs-match.model';

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

  teams: Array<InterclubsTeamModel>;
  divisions: Array<InterclubsDivisionModel>;
  matches: Array<InterclubsMatchModel>;

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
        res => {
          this.semaines = res;

          // chargement des equipes
          this.selectionService.getInterclubsTeams()
            .subscribe(
              teams => {
                this.teams = teams;

                // chargement des divisions
                this.selectionService.getInterclubsDivisions()
                  .subscribe(
                    divisions => {
                      this.divisions = divisions;

                      // chargement des matches
                      this.selectionService.getInterclubsMatches()
                        .subscribe(
                          matches => {
                            this.matches = matches;
                            console.log('Toutes les données interclubs ont étées lues');
                          },
                          err => console.error('error loading matches', err)
                          ,
                          () => this.loading=false
                        );
                    }
                  );
              }
            );
        }
        , 
        error => console.error (error)
        
      )
    ;
  }

  getFilteredSemaineByInterclubCategory(category: InterclubsCategoryModel): Array<InterclubsSemaineModel>
  {
    if(this.semaines===null || this.semaines===undefined) return null;
    return this.semaines.filter( s => s.afftDivisionCategoryId === category.playerCategory );
  }
}
