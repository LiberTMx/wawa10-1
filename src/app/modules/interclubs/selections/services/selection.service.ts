import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InterclubsSemaineModel } from '../model/interclubs-semaine.model';
import { InterclubsCategoryModel } from '../model/interclubs-category.model';
import { environment } from '../../../../../environments/environment';
import { InterclubsDivisionModel } from '../model/interclubs-division.model';
import { InterclubsTeamModel } from '../model/interclubs-team.model';
import { InterclubsMatchModel } from '../model/interclubs-match.model';
import { InterclubsLdfParticipantModel } from '../model/interclubs-ldf-participant.model';
import { InterclubsLdfByCategoryModel } from '../model/interclubs-ldf-by-category.model';
import { InterclubsSemaineVersionModel } from '../model/interclubs-semaine-version.model';
import { InterclubsLDF } from '../model/interclubs-ldf.model';

@Injectable({
  providedIn: 'root'
})
export class SelectionService {

  selectedCategory: number;
  categories: Array<InterclubsCategoryModel>;

  constructor(
    private httpClient: HttpClient,
  ) { }


  // @Get('listeSemainesInterclubs/:type')
  getInterclubsSemaineByInterclubType(interclubType: any): Observable< InterclubsSemaineModel[] >
  {
    //return this.interclubsService.getInterclubsSemaineByInterclubType(interclubType);
    // http://server/api/interclubs/listeSemainesInterclubs/dames
    const url=`${environment.apiUrl}`;  
    const apiUrl = `${url}/interclubs/listeInterclubsSemaines/${interclubType}`;
    return this.httpClient.get<Array<InterclubsSemaineModel>>(apiUrl);

    /*
    const url=`${environment.apiUrl}`;  
    const apiUrl = `${url}/interclubs/listeSemainesInterclubs`;
    return this.httpClient.get<AuthGroupModel>(apiUrl, { type: interclubType });
    */
  }

  getInterclubsCategories(): Observable< Array<InterclubsCategoryModel> >
  {
    const url=`${environment.apiUrl}`;  
    const apiUrl = `${url}/interclubs/listeInterclubsCategories`;
    return this.httpClient.get<Array<InterclubsCategoryModel>>(apiUrl);
  }

  setSelectedInterclubCategory(selectedCategory: number)
  {
    this.selectedCategory = selectedCategory;
  }

  setCategories(categories: Array<InterclubsCategoryModel>)
  {
    this.categories = categories;
  }

  findInterclubCategoryById(categoryId: number): InterclubsCategoryModel
  {
    if( this.categories !==null && this.categories!==undefined)
    {
      return this.categories.find( c => c.id === categoryId);
    }
    return null;
  }
  

  getInterclubsDivisions(): Observable< Array<InterclubsDivisionModel> >
  {
    const url=`${environment.apiUrl}`;  
    const apiUrl = `${url}/interclubs/listeInterclubsDivisions`;
    return this.httpClient.get<Array<InterclubsDivisionModel>>(apiUrl);
  }

  getInterclubsTeams(): Observable< Array<InterclubsTeamModel> >
  {
    const url=`${environment.apiUrl}`;  
    const apiUrl = `${url}/interclubs/listeInterclubsTeams`;
    return this.httpClient.get<Array<InterclubsTeamModel>>(apiUrl);
  }

  getInterclubsMatches(): Observable< Array<InterclubsMatchModel> >
  {
    const url=`${environment.apiUrl}`;  
    const apiUrl = `${url}/interclubs/listeInterclubsMatches`;
    return this.httpClient.get<Array<InterclubsMatchModel>>(apiUrl);
  }

  getInterclubsLDFParticipants(): Observable< Array<InterclubsLdfParticipantModel> >
  {
    const url=`${environment.apiUrl}`;  
    const apiUrl = `${url}/interclubs/LDFParticipants`;
    return this.httpClient.get<Array<InterclubsLdfParticipantModel>>(apiUrl);
  }

  getInterclubsLDFByCategory(): Observable< Array<InterclubsLdfByCategoryModel> >
  {
    const url=`${environment.apiUrl}`;  
    const apiUrl = `${url}/interclubs/LDFByCategory`;
    return this.httpClient.get<Array<InterclubsLdfByCategoryModel>>(apiUrl);
  }

  //@Get('semaineNextVersion/:semaineId')
  getSemaineNextVersion(semaine: InterclubsSemaineModel): Observable< Array<InterclubsSemaineVersionModel>>
  {
    const apiUrl=`${environment.apiUrl}/interclubs/semaineNextVersion/${semaine.id}`;
    return this.httpClient.get<Array<InterclubsSemaineVersionModel>>(apiUrl);
  }

  getSemaineVersions(semaine: InterclubsSemaineModel): Observable <Array<InterclubsSemaineVersionModel>>
  {
    const apiUrl=`${environment.apiUrl}/interclubs/semaineVersions/${semaine.id}`;
    return this.httpClient.get<Array<InterclubsSemaineVersionModel>>(apiUrl);
  }

  storeSelection(selection: InterclubsLDF, match: InterclubsMatchModel, position: number): Observable<InterclubsLDF>
  {
    return Observable.of(selection);
  }

  storeReserve(selection: InterclubsLDF, match: InterclubsMatchModel, position: number): Observable<InterclubsLDF>
  {
    return Observable.of(selection);
  }
}
