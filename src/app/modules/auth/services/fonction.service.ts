import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AuthFonctionModel } from '../model/auth-fonction.model';

@Injectable({
  providedIn: 'root'
})
export class FonctionService 
{

  constructor(
    private httpClient: HttpClient,
  ) { }

  getAllFonctions(): Observable< Array<AuthFonctionModel> >
  {
    const apiUrl=`${environment.apiUrl}/auth/fonctions`;
    return this.httpClient.get<Array<AuthFonctionModel>>( apiUrl );
  } 

  createNewFonction(code: string, designation: string, description: string): Observable<AuthFonctionModel>
  {
    const url=`${environment.apiUrl}`;  
    const apiUrl = `${url}/auth/createFonction`;
    return this.httpClient.post<AuthFonctionModel>(apiUrl, { code, designation, description });
  }
}
