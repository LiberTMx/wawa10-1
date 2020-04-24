import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticatedUserModel } from '../../auth/model/authenticated-user.model';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoiService 
{

  constructor(private httpClient: HttpClient) { }

  createOrUpdateStatus(formValue: any, user: AuthenticatedUserModel): Observable<any> 
  {
    const apiUrl=`${environment.apiUrl}/roi/createOrUpdate`;
    const postData = new FormData();
    postData.append('avatarPdf' , formValue.avatarPdf );
    postData.append('auteurId' , String(user.getId()) );
    return this.httpClient.post<any>(apiUrl,  postData);
  }

  downloadDocumentFile(): Observable<any>
  {
    const url=`${environment.apiUrl}`;  
    const apiUrl = `${url}/roi/downloadDocument`;
    return this.httpClient.get(apiUrl, {responseType: /*ResponseContentType.Blob*/ 'blob'});
  }
}
