import { Component, OnInit, Input } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { flyInOut } from 'ng-uikit-pro-standard';
import { InterclubsTeamSelectionDataModel } from '../selections/model/interclubs-team-selection-data.model';
import { InterclubsLDF } from '../selections/model/interclubs-ldf.model';

import { PdfMakeWrapper, PageReference, Txt, Table } from 'pdfmake-wrapper';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { TeamSelectionPdfGenerator } from '../utils/pdf/team-selection-pdf-generator';
import { InterclubsCategoryModel } from '../selections/model/interclubs-category.model';

@Component({
  selector: 'app-selection-information-by-team',
  templateUrl: './selection-information-by-team.component.html',
  styleUrls: ['./selection-information-by-team.component.scss']
})
export class SelectionInformationByTeamComponent implements OnInit {

  @Input()
  teamData: InterclubsTeamSelectionDataModel;

  @Input()
  interclubsCategory: InterclubsCategoryModel;

  
  constructor(
    private viewportScroller: ViewportScroller
  ) { }

  ngOnInit(): void 
  {
    console.log('selection information team data', this.teamData);
  }

  getParticipantIndex(index: number): number
  {
    if (this.teamData!== null && this.teamData!==undefined)
    {
      const selections= this.teamData.selections;
      if(selections!==null && selections !== undefined)
      {
        const selection = selections[index];
        if(selection !== null && selection !== undefined)
        {
          const listeDeForce = selection.ldf.listeDeForce;
          return listeDeForce.rankingIndex ;
        }
      }
    }
    return null;
  }

  getParticipantName(index: number): string
  {
    if (this.teamData!== null && this.teamData!==undefined)
    {
      const selections= this.teamData.selections;
      if(selections!==null && selections !== undefined)
      {
        const selection = selections[index];
        if(selection !== null && selection !== undefined)
        {
          const participant = selection.ldf.participant;
          return participant.prenom + ' ' + participant.nom;
        }
      }
    }
    return '';
  }
  
  getParticipantClassement(index: number): string
  {
    if (this.teamData!== null && this.teamData!==undefined)
    {
      const selections= this.teamData.selections;
      if(selections!==null && selections !== undefined)
      {
        const selection = selections[index];
        if(selection !== null && selection !== undefined)
        {
          const listeDeForce = selection.ldf.listeDeForce;
          return listeDeForce.classement; 
        }
      }
    }
    return '';
  }

  getParticipantMobile(index: number): string
  {
    if (this.teamData!== null && this.teamData!==undefined)
    {
      const selections= this.teamData.selections;
      if(selections!==null && selections !== undefined)
      {
        const selection = selections[index];
        if(selection !== null && selection !== undefined)
        {
          const user = selection.user;
          return user.numMobile; 
        }
      }
    }
    return '';
  }

  getParticipantStatut(index: number): string
  {
    if (this.teamData!== null && this.teamData!==undefined)
    {
      const selections= this.teamData.selections;
      if(selections!==null && selections !== undefined)
      {
        const selection = selections[index];
        if(selection !== null && selection !== undefined)
        {
          return selection.sel.joueur_confirmation;
        }
      }
    }
    return '';
  }

  getParticipantCommentaire(index: number): string
  {
    if (this.teamData!== null && this.teamData!==undefined)
    {
      const selections= this.teamData.selections;
      if(selections!==null && selections !== undefined)
      {
        const selection = selections[index];
        if(selection !== null && selection !== undefined)
        {
          return selection.sel.joueur_commentaire;
        }
      }
    }
    return '';
  }

  public onAnchorClick(elementId: string): void 
  { 
    this.viewportScroller.scrollToAnchor(elementId);
  }

  onExportTeamAsPdf()
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
    const footerText= new Txt('Rencontre interclub '+this.interclubsCategory.synonyme
        +' - Semaine '+this.teamData.match.WeekName
        +' - Equipe: ' +this.teamData.team.Team)
      .alignment('center')
      .italics()
      .end 
    ;
    pdf.footer(footerText);

    const pdfGenerator = new TeamSelectionPdfGenerator(pdf);
    pdf=pdfGenerator.appendTeamDataToPdf(this.interclubsCategory, this.teamData);
    pdf.create().download();
  }
}
