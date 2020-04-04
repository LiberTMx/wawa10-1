import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AfttClubTeamModel, AfttTeamsApiGetResponse } from '../interclubs/model/aftt-team.model';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';
import { __assign } from 'tslib';
import { AfttAllDataEntity } from '../interclubs/model/aftt/aftt-all-data.entity';
import { AfttDivisionCategoryEntity } from '../interclubs/model/aftt/aftt-division-category.entity';
import { AfttTeamEntity } from '../interclubs/model/aftt/aftt-team.entity';
import { AfttDivisionEntity } from '../interclubs/model/aftt/aftt-division.entity';
import { AfttMemberByCategoryEntity } from '../interclubs/model/aftt/aftt-member-by-category.entity';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private httpClient: HttpClient,
  ) { }


  getAfttTeamsUsingSoap(): Observable<AfttTeamsApiGetResponse>
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

  // Infos sur la dernière sync aftt -> local
  getLastAfttSyncInfo(): Observable<AfttAllDataEntity>
  {
    const url=`${environment.apiUrl}`;  
    const apiUrl = `${url}/admin/lastAfttSyncId/`;
    return this.httpClient.get<AfttAllDataEntity>(apiUrl);
  }

  getAfttDivisions(syncId: number): Observable<Array<AfttDivisionEntity>>
  {
    const url=`${environment.apiUrl}`;  
    const apiUrl = `${url}/admin/afttDivisions/${syncId}`;
    return this.httpClient.get<Array<AfttDivisionEntity>>(apiUrl);
  }

  getAfttDivisionCategories(): Observable<Array<AfttDivisionCategoryEntity>>
  {
    const url=`${environment.apiUrl}`;  
    const apiUrl = `${url}/admin/afttDivisionCategories/`;
    return this.httpClient.get<Array<AfttDivisionCategoryEntity>>(apiUrl);
  }

  getAfttTeams(syncId: number): Observable<Array<AfttTeamEntity>>
  {
    const url=`${environment.apiUrl}`;  
    const apiUrl = `${url}/admin/afttTeams/${syncId}`;
    return this.httpClient.get<Array<AfttTeamEntity>>(apiUrl);
  }

  getAfttMembers(syncId: number): Observable<Array<AfttMemberByCategoryEntity>>
  {
    const url=`${environment.apiUrl}`;  
    const apiUrl = `${url}/admin/afttMembers/${syncId}`;
    return this.httpClient.get<Array<AfttMemberByCategoryEntity>>(apiUrl);
  }

}
