import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InterclubsSemaineModel } from '../model/interclubs-semaine.model';

@Injectable({
  providedIn: 'root'
})
export class SelectionService {

  constructor(
    private httpClient: HttpClient,
  ) { }


  // @Get('listeSemainesInterclubs/:type')
  getInterclubsSemaineByInterclubType(interclubType: any) : Observable< InterclubsSemaineModel[] >
  {
    //return this.interclubsService.getInterclubsSemaineByInterclubType(interclubType);
    // http://server/api/interclubs/listeSemainesInterclubs/dames
    const url=`${environment.apiUrl}`;  
    const apiUrl = `${url}/interclubs/listeSemainesInterclubs/${interclubType}`;
    return this.httpClient.get<Array<InterclubsSemaineModel>>(apiUrl);

    /*
    const url=`${environment.apiUrl}`;  
    const apiUrl = `${url}/interclubs/listeSemainesInterclubs`;
    return this.httpClient.get<AuthGroupModel>(apiUrl, { type: interclubType });
    */
  }
}
