import { Component, OnInit, Input } from '@angular/core';
import { flyInOut } from 'ng-uikit-pro-standard';
import { InterclubsTeamSelectionDataModel } from '../selections/model/interclubs-team-selection-data.model';
import { InterclubsLDF } from '../selections/model/interclubs-ldf.model';

@Component({
  selector: 'app-selection-information-by-team',
  templateUrl: './selection-information-by-team.component.html',
  styleUrls: ['./selection-information-by-team.component.scss']
})
export class SelectionInformationByTeamComponent implements OnInit {

  @Input()
  teamData: InterclubsTeamSelectionDataModel;


  
  constructor() { }

  ngOnInit(): void 
  {
    console.log('selection information team data', this.teamData);
  }

  getParticipantIndex(index: number) : number
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

  getParticipantName(index: number) : string
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
  
  getParticipantClassement(index: number) : string
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

  getParticipantMobile(index: number) : string
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

  getParticipantStatut(index: number) : string
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

  getParticipantCommentaire(index: number) : string
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
}
