import { Component, OnInit } from '@angular/core';
import { InterclubsSemaineModel } from '../model/interclubs-semaine.model';
import { SelectionService } from '../services/selection.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { InterclubsCategoryModel } from '../model/interclubs-category.model';
import { InterclubsTeamModel } from '../model/interclubs-team.model';
import { InterclubsDivisionModel } from '../model/interclubs-division.model';
import { InterclubsMatchModel } from '../model/interclubs-match.model';
import { InterclubsLdfParticipantModel } from '../model/interclubs-ldf-participant.model';
import { InterclubsLdfByCategoryModel } from '../model/interclubs-ldf-by-category.model';
import { InterclubsLDF } from '../model/interclubs-ldf.model';


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

  ldfParticipants: Array<InterclubsLdfParticipantModel>;
  ldfByCategory: Array<InterclubsLdfByCategoryModel>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private selectionService: SelectionService,
    ) { }

  ngOnInit(): void {

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

                            // Chargement des infos liste des forces - participants
                            this.selectionService.getInterclubsLDFParticipants()
                              .subscribe(
                                participants => {
                                  this.ldfParticipants = participants;

                                  // Chargement de la composition des listes de forces
                                  this.selectionService.getInterclubsLDFByCategory()
                                    .subscribe(
                                      compositions => {
                                        this.ldfByCategory = compositions;
                                        console.log('Toutes les données interclubs ont étées lues');
                                      }
                                      ,
                                      err => console.error('error loading matches', err)
                                      ,
                                      () => this.loading=false
                                    );
                                }
                              );
                          }
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

  getFilteredSemaineByCategory(category: InterclubsCategoryModel): Array<InterclubsSemaineModel>
  {
    if(this.semaines===null || this.semaines===undefined) return null;
    return this.semaines.filter( s => s.afftDivisionCategoryId === category.playerCategory );
  }

  getFilterTeamsByCategory(category: InterclubsCategoryModel): Array<InterclubsTeamModel>
  {
    if(this.teams===null || this.teams===undefined) return null;
    const filterTeams =  this.teams.filter( t => t.DivisionCategory === category.id );

    filterTeams.sort( (t1, t2) => {
      if(t1.Team < t2.Team) return -1;
      if(t1.Team > t2.Team) return +1;
      return 0;
    });
    return filterTeams;
  }


  buildListeDesForcesByCategory(category: InterclubsCategoryModel): Array<InterclubsLDF>
  {
    const ldf=new Array<InterclubsLDF>();

    const ldfCats = this.ldfByCategory.filter( c => c.playerCategory === category.playerCategory);
    if(ldfCats!==null && ldfCats!==undefined)
    {
      for(const ldfCat of ldfCats)
      {
        const participant = this.ldfParticipants.find( p => p.id === ldfCat.participantId);
        if(participant!==null && participant!==undefined)
        {
          ldf.push( new InterclubsLDF( participant, ldfCat) );
        }
      }
    }

    // Faut maintenant trier la ldf dans le bon ordre !
    ldf.sort( (p1, p2) => {
      if(p1.listeDeForce.position < p2.listeDeForce.position) return -1;
      if(p1.listeDeForce.position > p2.listeDeForce.position) return +1;
      return 0;
    } );

    return ldf;
  }

  
}
