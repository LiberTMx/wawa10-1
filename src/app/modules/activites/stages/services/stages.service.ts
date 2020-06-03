import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StageModel } from '../model/stage.model';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StagesService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  createStage(stageFormValue: any): Observable<StageModel> 
  {
    const apiUrl=`${environment.apiUrl}/stage/createStage`;
    const postData = new FormData();
    postData.append('titre' , stageFormValue.titre );
    postData.append('presentation' , stageFormValue.presentation );
    postData.append('status' , stageFormValue.status );
    postData.append('externalLink' , stageFormValue.externalLink );
    postData.append('showOrder' , stageFormValue.showOrder );
    postData.append('avatar' , stageFormValue.avatar );
    postData.append('image' , stageFormValue.image );
    return this.httpClient.post<StageModel>(apiUrl,  postData);
  }
}
