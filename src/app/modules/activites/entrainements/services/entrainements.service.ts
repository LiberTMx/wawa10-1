import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { EntrainementClasseModel } from '../model/entrainement-classe.model';
import { EntrainementClasseGroupeModel } from '../model/entrainement-classe-groupe.model';
import { EntrainementGroupeSeanceModel } from '../model/entrainement-groupe-seance.model';

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

  downloadClasseGroupeImageFile(groupe: EntrainementClasseGroupeModel): Observable<any>
  {
    const url=`${environment.apiUrl}`;  
    const apiUrl = `${url}/entrainement/downloadClasseGroupeImage/${groupe.classeId}/${groupe.id}/${groupe.imageFilename}`;
    return this.httpClient.get(apiUrl, {responseType: /*ResponseContentType.Blob*/ 'blob'});
  }

  getEntrainementClasse(classeId: number): Observable< EntrainementClasseModel>
  {
    const url=`${environment.apiUrl}`;  
    const apiUrl = `${url}/entrainement/classe/${classeId}`;
    return this.httpClient.get<EntrainementClasseModel>(apiUrl);
  }

  getEntrainementClasseGroupes(classeId: number): Observable<Array<EntrainementClasseGroupeModel>>
  {
    const url=`${environment.apiUrl}`;  
    const apiUrl = `${url}/entrainement/classeGroupes/${classeId}`;
    return this.httpClient.get<Array<EntrainementClasseGroupeModel>>(apiUrl);
  }

  createClasseGroupe(classeId: number, groupeFormValue: any): Observable<EntrainementClasseGroupeModel> 
  {
    const apiUrl=`${environment.apiUrl}/entrainement/createClasseGroupe`;
    const postData = new FormData();
    postData.append('classeId' , String(classeId) );
    postData.append('titre' , groupeFormValue.titre );
    postData.append('presentation' , groupeFormValue.presentation );
    postData.append('status' , groupeFormValue.status );
    postData.append('limiteAge' , groupeFormValue.limiteAge );
    postData.append('limiteClassement' , groupeFormValue.limiteClassement );
    postData.append('showOrder' , groupeFormValue.showOrder );
    postData.append('avatar' , groupeFormValue.avatar );
    postData.append('imageFilename' , groupeFormValue.image );
    postData.append('periodeId' , groupeFormValue.periodeId );
    return this.httpClient.post<EntrainementClasseGroupeModel>(apiUrl,  postData);
  }

  createGroupeSeance(seanceFormValue: any): Observable<EntrainementGroupeSeanceModel>
  {
    /*
    titre: [this.dialogData.groupe.titre, [Validators.required, Validators.minLength(2)] ],
    presentation: [''],
    jourIndex: ['', [Validators.required] ],
    heureDebut: ['', [Validators.required] ],
    heureFin: ['', [Validators.required] ],
    groupeId: this.dialogData.groupe.id,
    classeId: this.dialogData.classe.id
    */
    const apiUrl=`${environment.apiUrl}/entrainement/createGroupeSeance`;

    return this.httpClient.post<EntrainementGroupeSeanceModel>(apiUrl, 
      {
        titre: seanceFormValue.titre,
        presentation: seanceFormValue.presentation,
        jourIndex: seanceFormValue.jourIndex,
        heureDebut: seanceFormValue.heureDebut,
        heureFin: seanceFormValue.heureFin,
        groupeId: seanceFormValue.groupeId,
        classeId: seanceFormValue.classeId,
      });
  }

  getEntrainementGroupeSeances(groupeId: number): Observable<Array<EntrainementGroupeSeanceModel>>
  {
    const url=`${environment.apiUrl}`;  
    const apiUrl = `${url}/entrainement/groupeSeances/${groupeId}`;
    return this.httpClient.get<Array<EntrainementGroupeSeanceModel>>(apiUrl);
  }
}
