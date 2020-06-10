import { InterclubsTeamSelectionDataModel } from '../../selections/model/interclubs-team-selection-data.model';
import { PdfMakeWrapper, Txt, Table } from 'pdfmake-wrapper';
import { InterclubsCategoryModel } from '../../selections/model/interclubs-category.model';
import { formatDate } from '@angular/common';
import { select } from '@ngrx/store';
import { InterclubsMatchModel } from '../../selections/model/interclubs-match.model';

export class TeamSelectionPdfGenerator
{
    constructor(
        private pdf: PdfMakeWrapper,
    ) {}

    appendTeamDataToPdf(interclubsCategory: InterclubsCategoryModel, teamData: InterclubsTeamSelectionDataModel): PdfMakeWrapper
    {
        // Description de la rencontre

        let tBody: string[][]=[];
        let trow=[];
        trow.push(new Txt('Equipe: ').fontSize(12).bold().end);
        trow.push(new Txt(teamData.team.Team).fontSize(12).end);
        tBody.push(trow);
        let tab = new Table(tBody).layout('noBorders').end;
        this.pdf.add(tab);

        this.pdf.add(
            this.pdf.ln(2)
        );

        tBody=[];
        trow=[];
        trow.push(new Txt('Match: ').fontSize(12).bold().end);
        trow.push(new Txt(
            teamData.match.HomeTeam + ' (' +teamData.match.HomeClub +') - '+ teamData.match.AwayTeam +' ('+ teamData.match.AwayClub + ')'
            ).fontSize(12).end);
        tBody.push(trow);
        tab = new Table(tBody).layout('noBorders').end;
        this.pdf.add(tab);

        tBody=[];
        trow=[];
        trow.push(new Txt('Numéro: ').fontSize(12).bold().end);
        trow.push(new Txt(
            teamData.match.MatchId
            ).fontSize(12).end);
        tBody.push(trow);
        tab = new Table(tBody).layout('noBorders').end;
        this.pdf.add(tab);


        //const when= this.datePipe.transform(teamData.match.matchDate, 'dd/MM/yyyy');

        const when=formatDate(teamData.match.matchDate, 'EEEE dd/MM/yyyy', 'fr-BE');
        tBody=[];
        trow=[];
        trow.push(new Txt('Quand: ').fontSize(12).bold().end);
        trow.push(new Txt(
            when + ' à ' + teamData.match.Time
            ).fontSize(12).end);
        tBody.push(trow);
        tab = new Table(tBody).layout('noBorders').end;
        this.pdf.add(tab);

        tBody=[];
        trow=[];
        trow.push(new Txt('Division: ').fontSize(12).bold().end);
        trow.push(new Txt(
            teamData.match.division?.DivisionName
            ).fontSize(12).end);
        tBody.push(trow);
        tab = new Table(tBody).layout('noBorders').end;
        this.pdf.add(tab);

        this.pdf.add(
            this.pdf.ln(1)
        );

        tBody=[];
        trow=[];
        trow.push(new Txt('Local: ').fontSize(12).bold().end);
        trow.push(new Txt(
            this.getMatchVenue(teamData.match)
            ).fontSize(12).end);
        tBody.push(trow);
        tab = new Table(tBody).layout('noBorders').end;
        this.pdf.add(tab);

        this.pdf.add(
            this.pdf.ln(1)
        );

        this.pdf.add(
            new Txt('Composition de l\'équipe: ')
            //.pageBreak('before')
            .fontSize(12)
            .bold()
            .end
        );
        this.pdf.add(
            this.pdf.ln(1)
        );

        let tBody2: string[][]=[];
        let theader=[];
        theader.push('Num');
        theader.push('Nom et prénom');
        theader.push('Class');
        theader.push('Tel');
        theader.push('GSM');
        theader.push('Statut');
        theader.push('Commentaire');
        tBody2.push(theader);

        for(let pos=1; pos<=4; pos++)
        {
            const t2row=[];
            t2row.push(''+pos);

            const selection = teamData.selections?.find( sel => sel.sel.position === pos);
            if(selection !==null && selection !== undefined )
            {
                t2row.push( selection.ldf.participant.nom + ' ' + selection.ldf.participant.prenom );
                t2row.push( selection.ldf.listeDeForce.classement );
                t2row.push( selection.user.numTel );
                t2row.push( selection.user.numMobile );
                t2row.push( selection.sel.joueur_confirmation );
                t2row.push( new Txt(selection.sel.joueur_commentaire).fontSize(9).end);
            }
            else
            {
                t2row.push( ' ' );
                t2row.push( ' ' );
                t2row.push( ' ' );
                t2row.push( ' ' );
                t2row.push( ' ' );
                t2row.push( ' ' );
            }
            tBody2.push(t2row);
        }

        tab= new Table(
            tBody2
          )
          .headerRows(1)
          .fontSize(12)
          .end 
        ;
        this.pdf.add(tab);

        this.pdf.add(
            this.pdf.ln(1)
        );

        // RESERVES
        this.pdf.add(
            new Txt('Les réserves: ')
            //.pageBreak('before')
            .fontSize(12)
            .bold()
            .end
        );
        this.pdf.add(
            this.pdf.ln(1)
        );

        tBody2=[];
        theader=[];
        theader.push('Num');
        theader.push('Nom et prénom');
        theader.push('Class');
        theader.push('Tel');
        theader.push('GSM');
        theader.push('Statut');
        theader.push('Commentaire');
        tBody2.push(theader);

        for(let pos=5; pos<=8; pos++)
        {
            const t2row=[];
            t2row.push('R'+(pos-4) );

            const selection = teamData.selections?.find( sel => sel.sel.position === pos);
            if(selection !==null && selection !== undefined )
            {
                t2row.push( selection.ldf.participant.nom + ' ' + selection.ldf.participant.prenom );
                t2row.push( selection.ldf.listeDeForce.classement );
                t2row.push( selection.user.numTel );
                t2row.push( selection.user.numMobile );
                t2row.push( selection.sel.joueur_confirmation );
                t2row.push( new Txt(selection.sel.joueur_commentaire).fontSize(9).end);
            }
            else
            {
                t2row.push( ' ' );
                t2row.push( ' ' );
                t2row.push( ' ' );
                t2row.push( ' ' );
                t2row.push( ' ' );
                t2row.push( ' ' );
            }
            tBody2.push(t2row);
        }

        tab= new Table(
            tBody2
          )
          .headerRows(1)
          .fontSize(12)
          .end 
        ;
        this.pdf.add(tab);

        this.pdf.add(
            this.pdf.ln(1)
        );

        this.pdf.add(
            new Txt('Informations complémentaires: ')
            //.pageBreak('before')
            .fontSize(12)
            .bold()
            .end
        );
        this.pdf.add(
            this.pdf.ln(1)
        );

        tBody=[];
        trow=[];
        trow.push(new Txt('Chauffeur: ').fontSize(12).bold().end);
        trow.push(new Txt(
            ' ? '
            ).fontSize(12).end);
        tBody.push(trow);
        tab = new Table(tBody).layout('noBorders').end;
        this.pdf.add(tab);

        tBody=[];
        trow=[];
        trow.push(new Txt('Rendez-vous: ').fontSize(12).bold().end);
        trow.push(new Txt(
            ' ? '
            ).fontSize(12).end);
        tBody.push(trow);
        tab = new Table(tBody).layout('noBorders').end;
        this.pdf.add(tab);

        tBody=[];
        trow=[];
        trow.push(new Txt('Remarque: ').fontSize(12).bold().end);
        trow.push(new Txt(
            ' ? '
            ).fontSize(12).end);
        tBody.push(trow);
        tab = new Table(tBody).layout('noBorders').end;
        this.pdf.add(tab);

        return this.pdf;
    }

    getMatchVenue(match: InterclubsMatchModel): string
    {
        let venue= '';
        venue += match.venueName ? match.venueName + ', '  : '';
        venue += match.venueStreet ? match.venueStreet + ', ' : '';
        venue += match.venueTown ? match.venueTown  : ' ';

        venue += match.venuePhone ? ', TEL: ' + match.venuePhone : '';
        venue += match.venueComment ? ', Infos: ' + match.venueComment : '';

        return venue;
    }
}
