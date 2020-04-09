import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AfttClubTeamModel, AfttTeamsApiGetResponse } from '../interclubs/model/aftt-team.model';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';
import { __assign } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private httpClient: HttpClient,
  ) { }


  getAfttTeams(): Observable<AfttTeamsApiGetResponse>
  {
    const url=`${environment.apiUrl}`;  
    const apiUrl = `${url}/admin/teamList/`;
    return this.httpClient.get<AfttTeamsApiGetResponse>(apiUrl);
    /*
    .pipe(
      map( (res: {data: string, err: any}) => {
        //const d= JSON.parse(res);
        const r = new AfttTeamsApiGetResponse();
        Object.assign(r.data,  JSON.parse(res.data));
        Object.assign(r.err,  JSON.parse(res.err));
        return r;
      }
    )
      
    );*/
  }
}
