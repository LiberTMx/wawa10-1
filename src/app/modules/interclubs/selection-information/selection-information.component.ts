import { Component, OnInit } from '@angular/core';
import { InterclubsCategoryModel } from '../selections/model/interclubs-category.model';
import { InterclubsSemaineModel } from '../selections/model/interclubs-semaine.model';
import { SelectionService } from '../selections/services/selection.service';
import { InterclubsTeamModel } from '../selections/model/interclubs-team.model';
import { InterclubsMatchModel } from '../selections/model/interclubs-match.model';
import { InterclubsSemaineVersionModel } from '../selections/model/interclubs-semaine-version.model';
import { InterclubsTeamSelectionDataModel } from '../selections/model/interclubs-team-selection-data.model';
import { InterclubsLDF } from '../selections/model/interclubs-ldf.model';
import { InterclubsLdfParticipantModel } from '../selections/model/interclubs-ldf-participant.model';
import { InterclubsLdfByCategoryModel } from '../selections/model/interclubs-ldf-by-category.model';
import { InterclubsEnrichedSelectionModel } from '../selections/model/interclubs-enriched-selection.model';
import { AuthUserModel } from '../../auth/model/auth-user.model';
import { InterclubsSelectionModel } from '../selections/model/interclubs-selection.model';
import { AuthenticatedUserModel } from '../../auth/model/authenticated-user.model';
import { AuthService } from '../../auth/services/auth.service';
import { ToastMessageService } from '../../../common/services/toast-message.service';
import { ViewportScroller } from '@angular/common';

import { PdfMakeWrapper, PageReference, Txt, Table } from 'pdfmake-wrapper';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { TeamSelectionPdfGenerator } from '../utils/pdf/team-selection-pdf-generator';

@Component({
  selector: 'app-selection-information',
  templateUrl: './selection-information.component.html',
  styleUrls: ['./selection-information.component.scss']
})
export class SelectionInformationComponent implements OnInit {
  
  semaines: Array<InterclubsSemaineModel>;
  semainesByInterclubsCategory: Array<InterclubsSemaineModel>;

  publishedSemaines: Array<InterclubsSemaineVersionModel>;
  selectedPublishedSemaine: InterclubsSemaineVersionModel;

  selectedSemaine: InterclubsSemaineModel;

  interclubs: Array<InterclubsCategoryModel>;

  selectedCategory: InterclubsCategoryModel;

  teams: Array<InterclubsTeamModel>;
  teamsByInterclubsCategory: Array<InterclubsTeamModel>;

  matches: Array<InterclubsMatchModel>;

  
  teamSelectionData: Array<InterclubsTeamSelectionDataModel> = null;

  ldfParticipants: Array<InterclubsLdfParticipantModel>;
  ldfByCategory: Array<InterclubsLdfByCategoryModel>;
  listeDesForces: Array<InterclubsLDF>;

  selectedMatch: any=null;// pas  bien... à corriger

  currentUserSelection: {sel: InterclubsSelectionModel, ldf: InterclubsLDF, user: AuthUserModel}=null;
  currentUserSelectionMatch: InterclubsMatchModel = null;

  connectedUser: AuthenticatedUserModel;
  
  constructor(
    private authService: AuthService,
    private selectionService: SelectionService,
    private toastMessageService: ToastMessageService,
    private viewportScroller: ViewportScroller,
  ) { }

  getTeamDataAnchor(teamData: InterclubsTeamSelectionDataModel): string
  {
    return 'team-'+teamData.match.id;
  }

  onAnchorClick(elementId: string): void 
  { 
    this.viewportScroller.scrollToAnchor(elementId);
  }

  onValidateSelection(selection: {sel: InterclubsSelectionModel, ldf: InterclubsLDF, user: AuthUserModel})
  {
    // TODO
  }

  onShowTeam(match: InterclubsMatchModel)
  {
    const teamDataAnchor = 'team-'+match.id;
    this.onAnchorClick(teamDataAnchor);
  }

  ngOnInit(): void 
  {
    this.connectedUser=this.authService.getCurrentUser();
    
    this.selectionService.getInterclubsCategories()
      .subscribe(
        res => this.interclubs = res
    );
      
    this.selectionService.getInterclubsSemaineByInterclubType(0)
      .subscribe(
        res => this.semaines = res
    );

    this.selectionService.getInterclubsTeams()
    .subscribe(
      teams => {
        this.teams = teams;
      }
    );

    this.selectionService.getInterclubsMatches()
      .subscribe(
        matches => {
          this.matches = matches;
        }
    );

    this.selectionService.getInterclubsLDFParticipants()
      .subscribe(
        participants => {
          this.ldfParticipants = participants;
        }
    );

    // Chargement de la composition des listes de forces
    this.selectionService.getInterclubsLDFByCategory()
      .subscribe(
        compositions => {
          this.ldfByCategory = compositions;
          console.log('Toutes les données interclubs ont étées lues');
        }
    );

    // publishedSemaines
    
    this.selectionService.getPublishedInterclubsSemaines()
      .subscribe(
        semaines => {
          this.publishedSemaines = semaines;
          console.log('published semaines', semaines);
        }
    );
  }
  
  buildListeDesForcesByCategory(category: InterclubsCategoryModel): Array<InterclubsLDF>
  {
    //console.log('Building ldf for catg:', category);

    const ldf=new Array<InterclubsLDF>();

    const ldfCats = this.ldfByCategory.filter( c => c.playerCategory === category.playerCategory);
    if(ldfCats!==null && ldfCats!==undefined)
    {
      for(const ldfCat of ldfCats)
      {
        const participant = this.ldfParticipants.find( p => p.id === ldfCat.participantId);
        if(participant!==null && participant!==undefined)
        {
          ldf.push( new InterclubsLDF( participant, ldfCat, true) );
        }
      }
    }

    // Faut maintenant trier la ldf dans le bon ordre !
    ldf.sort( (p1, p2) => {
      if(p1.listeDeForce.position < p2.listeDeForce.position) return -1;
      if(p1.listeDeForce.position > p2.listeDeForce.position) return +1;
      return 0;
    } );

    // console.log('ldf', ldf);

    return ldf;
  }
  
  getFilteredSemaineByCategory(category: InterclubsCategoryModel): Array<InterclubsSemaineModel>
  {
    if(this.semaines===null || this.semaines===undefined) return null;
    const filteredSemaines=this.semaines.filter( s => s.afftDivisionCategoryId === category.playerCategory );
    filteredSemaines.sort( (s1, s2) => {
      if(s1.weekName < s2.weekName) return -1;
      if(s1.weekName > s2.weekName) return +1;
      return 0;
    });
    return filteredSemaines;
  }

  onChangeCategory(event)
  {
    this.semainesByInterclubsCategory = this.getFilteredSemaineByCategory(this.selectedCategory);
    this.teamsByInterclubsCategory = this.getFilterTeamsByCategory(this.selectedCategory);
    this.listeDesForces=this.buildListeDesForcesByCategory(this.selectedCategory);
  }
 
  onChangeSemaine(event)
  {
    console.log('onChangeSemaine', this.selectedSemaine);

    if(this.publishedSemaines === null || this.publishedSemaines===undefined || this.publishedSemaines.length === 0 ) 
    {
      this.selectedPublishedSemaine=null;
      this.toastMessageService.addError('Selection', 'Pas de selection publiées pour la semaine choisie: '+this.selectedSemaine.weekName ,11000);
      return;
    }

    this.selectedPublishedSemaine=this.publishedSemaines.find( ps => ps.semaine_id === this.selectedSemaine.id );
    console.log('found published version:', this.selectedPublishedSemaine);

    if(this.selectedPublishedSemaine===null || this.selectedPublishedSemaine===undefined)
    {
      this.selectedPublishedSemaine=null;
      this.toastMessageService.addError('Selection', 'Pas de selection publiées pour la semaine choisie: '+this.selectedSemaine.weekName ,11000);
      return;
    }

    this.collectTeamData();
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

  collectTeamData()
  {
    const teamSelectionDataArray: Array<InterclubsTeamSelectionDataModel> = new Array<InterclubsTeamSelectionDataModel>();

    for(const team of this.teamsByInterclubsCategory)
    {
      const teamSelectionData: InterclubsTeamSelectionDataModel = new InterclubsTeamSelectionDataModel();
      // Team
      teamSelectionData.team = team;
      // Match
      const match = this.matches.find( m => 
        m.WeekName === this.selectedSemaine.weekName
        && ( m.homeTeamId === team.TeamId || m.awayTeamId === team.TeamId ) 
      );

      // const match = this.matches.find( m => m.awayTeamId === team.TeamId || m.homeTeamId === team.TeamId);
      teamSelectionData.match = match;

      // Selection
      this.selectionService.getEnrichedSelection(match, this.selectedPublishedSemaine)
        .subscribe(
          (enrichedSelections: Array<InterclubsEnrichedSelectionModel>) => {
            if(enrichedSelections!==null && enrichedSelections !==undefined && enrichedSelections.length>0)
            {
              const teamEnrichedSelections: Array<{sel: InterclubsSelectionModel, ldf: InterclubsLDF, user: AuthUserModel}> 
                                              = new Array<{sel: InterclubsSelectionModel, ldf: InterclubsLDF, user: AuthUserModel}>();
              for(const se of enrichedSelections)
              {
                const part: InterclubsLDF = this.listeDesForces.find( p => p.participant.authUserId === se.selection.auth_user_id);
                teamEnrichedSelections.push({sel: se.selection, ldf: part, user: se.user});

                if(this.connectedUser !==null && this.connectedUser !== undefined && se.user.id === this.connectedUser.id)
                {
                  this.currentUserSelection = {sel: se.selection, ldf: part, user: se.user};
                  this.currentUserSelectionMatch = match;
                }
              }
              teamSelectionData.selections = teamEnrichedSelections;
              //console.log('Selections for team '+team.Team, teamSelectionData);
            }
            teamSelectionData.selectionsLoaded=true;
          }
          ,
          err=>console.error('err', err)
  
        );

      // Informations

      // Ajout dans l'array de resultat
      teamSelectionDataArray.push(teamSelectionData);
    }

    this.teamSelectionData = teamSelectionDataArray;
  }

  onExportAllTeamsAsPdf()
  {
    PdfMakeWrapper.setFonts(pdfFonts);
    let pdf: PdfMakeWrapper = new PdfMakeWrapper();
    pdf.info({
      title: 'A document',
      author: 'pdfmake-wrapper',
      subject: 'subject of document',
    });
    pdf.pageSize('A4');
    pdf.pageMargins( 20 /*[ 40, 60, 40, 60 ]*/ );
    const footerText= new Txt('Rencontres interclubs '+this.selectedCategory.synonyme
        +' - Semaine '+this.selectedSemaine.weekName)
      .alignment('center')
      .italics()
      .end 
    ;
    pdf.footer(footerText);

    const pdfGenerator = new TeamSelectionPdfGenerator(pdf);
    for(const teamData of this.teamSelectionData)
    {
      pdf=pdfGenerator.appendTeamDataToPdf(this.selectedCategory, teamData);
      pdf.add(
        new Txt('')
        .pageBreak('before')
        .end
      );
    }
    pdf.create().download();
  }
}
