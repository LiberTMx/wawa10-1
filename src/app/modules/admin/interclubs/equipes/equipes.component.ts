import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { AfttClubTeamModel, AfttTeamsApiGetResponse, AfttTeamModel } from '../model/aftt-team.model';

@Component({
  selector: 'app-admin-equipes',
  templateUrl: './equipes.component.html',
  styleUrls: ['./equipes.component.scss']
})
export class EquipesComponent implements OnInit {

  afttClubTeamModel: AfttClubTeamModel=null;
  afttTeamsApiGetResponse: AfttTeamsApiGetResponse=null;

  error: any=null;

  @Output()
  messieursTeams=new EventEmitter<Array<AfttTeamModel>>();
  @Output()
  damesTeams=new EventEmitter<Array<AfttTeamModel>>();
  @Output()
  aineesTeams=new EventEmitter<Array<AfttTeamModel>>();
  @Output()
  veteransTeams=new EventEmitter<Array<AfttTeamModel>>();
  @Output()
  jeunesTeams=new EventEmitter<Array<AfttTeamModel>>();

  constructor(
    private adminService: AdminService
  ) { }

  ngOnInit(): void 
  {
  }

  onLoadEquipesFromAftt(): void
  {
    this.adminService.getAfttTeams()
      .subscribe(
        (res: AfttTeamsApiGetResponse) => {
          this.afttTeamsApiGetResponse=res;
          this.afttClubTeamModel=null;
          console.log('res', res);
          this.error=res.err;
          if(res.err !==null)
          {
            console.error('Unable to load aftt teams', res.err);
          }
          else
          {
            /*
            const data=new AfttClubTeamModel();
            data.ClubName=res.data.ClubName;
            this.afttClubTeamModel=data;
            console.log('onLoadEquipesFromAftt', data);
            */
           const resp: AfttTeamsApiGetResponse=res;
           console.log('club', resp.data.ClubName);
           this.afttClubTeamModel=resp.data;
           this.emitTeamsByType();
          }
        },
        (err) => console.error('Unable to load aftt teams', err)
      )
    ;
  }

  emitTeamsByType()
  {
    // for(cont t of afttClubTeamModel.TeamEntries)
    // Messieurs: 1 2
    let teams=this.afttClubTeamModel.TeamEntries.filter( t => t.DivisionCategory===1 && t.MatchType===2 );
    this.messieursTeams.emit(teams);
    // Dames: 2 4
    teams=this.afttClubTeamModel.TeamEntries.filter( t => t.DivisionCategory===2 && t.MatchType===4 );
    this.damesTeams.emit(teams);
    // Véterans: 3 4
    teams=this.afttClubTeamModel.TeamEntries.filter( t => t.DivisionCategory===3 && t.MatchType===4 );
    this.veteransTeams.emit(teams);
    // Ainées: 4 4
    teams=this.afttClubTeamModel.TeamEntries.filter( t => t.DivisionCategory===4 && t.MatchType===4 );
    this.aineesTeams.emit(teams);
    // Jeunes: 13 4
    teams=this.afttClubTeamModel.TeamEntries.filter( t => t.DivisionCategory===13 && t.MatchType===4 );
    this.jeunesTeams.emit(teams);
  }
}
