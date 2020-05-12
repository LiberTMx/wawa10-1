import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PeriodeModel } from '../model/periode.model';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PeriodesService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  getPeriodes(): Observable< Array<PeriodeModel> >
  {
    const url=`${environment.apiUrl}`;  
    const apiUrl = `${url}/periode/periodes`;
    return this.httpClient.get<Array<PeriodeModel>>(apiUrl);
  }

  /*
    nom: string;
    dateDebut: Date;
    dateFin: Date;
    isForEntrainement: boolean;
    isForStage: boolean;
    description: string;
  */
  createPeriode(periodeFormValue: any): Observable< PeriodeModel>
  {
    console.log('create a new periode',periodeFormValue );
    const apiUrl=`${environment.apiUrl}/periode/createPeriode`;
    /*
    const postData = new FormData();
    postData.append('nom' , periodeForm.titre );
    postData.append('dateDebut' , periodeForm.dateDebut );
    postData.append('dateFin' , periodeForm.dateFin );
    postData.append('isForEntrainements' , periodeForm.isForEntrainement );
    postData.append('isForStages' , periodeForm.isForStage );
    postData.append('description' , periodeForm.description );
    */
    return this.httpClient.post<PeriodeModel>(apiUrl,  { periodeFormValue });
  }
}
