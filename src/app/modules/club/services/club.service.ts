import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticatedUserModel } from '../../auth/model/authenticated-user.model';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  constructor(private httpClient: HttpClient) { }

  updateOrganisation(formValue: any, user: AuthenticatedUserModel): Observable<any> 
  {
    const apiUrl=`${environment.apiUrl}/club/updateOrganisationPdfDocument`;
    const postData = new FormData();
    postData.append('avatarPdf' , formValue.avatarPdf );
    postData.append('auteurId' , String(user.getId()) );
    return this.httpClient.post<any>(apiUrl,  postData);
  }

  getOrganisationPdfDocumentFile(): Observable<any>
  {
    const url=`${environment.apiUrl}`;  
    const apiUrl = `${url}/club/organisationPdfDocument`;
    return this.httpClient.get(apiUrl, {responseType: /*ResponseContentType.Blob*/ 'blob'});
  }
}
