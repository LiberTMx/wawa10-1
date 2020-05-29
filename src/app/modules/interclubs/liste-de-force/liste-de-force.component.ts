import { Component, OnInit } from '@angular/core';
import { SelectionService } from '../selections/services/selection.service';
import { InterclubsLdfParticipantModel } from '../selections/model/interclubs-ldf-participant.model';
import { InterclubsLdfByCategoryModel } from '../selections/model/interclubs-ldf-by-category.model';
import { AuthService } from '../../auth/services/auth.service';
import { noop } from 'rxjs';

@Component({
  selector: 'app-liste-de-force',
  templateUrl: './liste-de-force.component.html',
  styleUrls: ['./liste-de-force.component.scss']
})
export class ListeDeForceComponent implements OnInit 
{

  ldfParticipants: Array<InterclubsLdfParticipantModel>;
  ldfByCategory: Array<InterclubsLdfByCategoryModel>;

  verifyErrors=new Array<{nom: string, prenom: string, licence: string }>();

  constructor(
    private authService: AuthService,
    private selectionService: SelectionService,
  ) { }

  ngOnInit(): void 
  {
    this.selectionService.getInterclubsLDFParticipants()
      .subscribe(participants => this.ldfParticipants = participants);

    // Chargement de la composition des listes de forces
    this.selectionService.getInterclubsLDFByCategory()
      .subscribe(
        compositions => {
          this.ldfByCategory = compositions;
        }
    );
  }

  onVerifyParticipantToUserLink()
  {
    const errors=new Array<{nom: string, prenom: string, licence: string }>();

    if(this.ldfParticipants!==null && this.ldfParticipants!==undefined && this.ldfParticipants.length>0)
    {
      console.log('verify participant link - count:'+this.ldfParticipants.length);
      for(const part of this.ldfParticipants)
      {
        this.authService.findUserByLicence(part.licence)
          .subscribe(
            user => {
              console.log('compare part ad user:', part, user);
              if(user!==null && user!==undefined )
              {
                part.authUserId=user.id;
                this.selectionService.updateLdfParticipant(part)
                  .subscribe(
                    res => console.log('participant updated', part)
                  );
              }
              else
              {
                console.log('user not found !', part.licence);
                errors.push(
                  {nom: part.nom, prenom: part.prenom, licence: part.licence}
                );
              }
              
            }
            ,
            err => console.error(err)
          );
      }
    }

    this.verifyErrors=errors;
  }
}
