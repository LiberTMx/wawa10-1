import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthDomainModel } from '../../../auth/model/auth-user.model';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { AuthGroupModel } from '../../../auth/model/auth-group.model';
import { AuthGroupRoleModel } from '../../../auth/model/auth-group-role.model';
import { AuthRoleModel } from '../../../auth/model/auth-role.model';

@Injectable({
  providedIn: 'root'
})
export class AdminRoleService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  getAllDomains(): Observable<Array<AuthDomainModel>>
  {
    const url=`${environment.apiUrl}`;  
    const apiUrl = `${url}/auth/domainList`;
    return this.httpClient.get<Array<AuthDomainModel>>(apiUrl);
  }

  createNewDomain(domainName: string, domainCommentaire: string, showOrdre: number): Observable<AuthDomainModel>
  {
    const url=`${environment.apiUrl}`;  
    const apiUrl = `${url}/auth/domainCreate`;
    return this.httpClient.post<AuthDomainModel>(apiUrl, { domainName, domainCommentaire, showOrdre });
  }

  getAllGroups(): Observable<Array<AuthGroupModel>>
  {
    const url=`${environment.apiUrl}`;  
    const apiUrl = `${url}/auth/groupList`;
    return this.httpClient.get<Array<AuthGroupModel>>(apiUrl);
  }

  createNewGroup(name: string, commentaire: string): Observable<AuthGroupModel>
  {
    const url=`${environment.apiUrl}`;  
    const apiUrl = `${url}/auth/groupCreate`;
    return this.httpClient.post<AuthGroupModel>(apiUrl, { name, commentaire });
  }

  getAllRoles(): Observable<Array<AuthRoleModel>>
  {
    const url=`${environment.apiUrl}`;  
    const apiUrl = `${url}/auth/roleList`;
    return this.httpClient.get<Array<AuthRoleModel>>(apiUrl);
  }

  getAllGroupRoles(): Observable<Array<AuthGroupRoleModel>>
  {
    const url=`${environment.apiUrl}`;  
    const apiUrl = `${url}/auth/groupRoleList`;
    return this.httpClient.get<Array<AuthGroupRoleModel>>(apiUrl);
  }

}
