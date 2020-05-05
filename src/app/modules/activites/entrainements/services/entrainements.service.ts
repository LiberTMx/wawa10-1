import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { EntrainementClasseModel } from '../model/entrainement-classe.model';

@Injectable({
  providedIn: 'root'
})
export class EntrainementsService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  createClasse(classeFormValue: any): Observable<EntrainementClasseModel> 
  {
    const apiUrl=`${environment.apiUrl}/entrainement/createClasse`;
    const postData = new FormData();
    postData.append('titre' , classeFormValue.titre );
    postData.append('presentation' , classeFormValue.presentation );
    postData.append('status' , classeFormValue.status );
    postData.append('externalLink' , classeFormValue.externalLink );
    postData.append('showOrder' , classeFormValue.showOrder );
    postData.append('avatar' , classeFormValue.avatar );
    postData.append('image' , classeFormValue.image );
    return this.httpClient.post<EntrainementClasseModel>(apiUrl,  postData);
  }

  getEntrainementClasses(readAll: boolean): Observable< Array<EntrainementClasseModel> >
  {
    const url=`${environment.apiUrl}`;  
    const apiUrl = `${url}/entrainement/classes?readAll=${readAll}`;
    return this.httpClient.get<Array<EntrainementClasseModel>>(apiUrl);
  }

  // @Get('downloadClasseImage/:imageFilename/:classeId')
  downloadClasseImageFile(classe: EntrainementClasseModel): Observable<any>
  {
    const url=`${environment.apiUrl}`;  
    const apiUrl = `${url}/entrainement/downloadClasseImage/${classe.imageFilename}/${classe.id}`;
    return this.httpClient.get(apiUrl, {responseType: /*ResponseContentType.Blob*/ 'blob'});
  }

}
