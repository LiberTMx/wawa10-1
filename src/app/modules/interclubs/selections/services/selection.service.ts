import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InterclubsSemaineModel } from '../model/interclubs-semaine.model';
import { InterclubsCategoryModel } from '../model/interclubs-category.model';
import { environment } from '../../../../../environments/environment';

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
  
}
