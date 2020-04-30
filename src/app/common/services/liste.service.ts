import { Injectable } from '@angular/core';
import { KvpModel } from '../model/kvp.model';

@Injectable({
  providedIn: 'root'
})
export class ListeService {

  constructor() { }

  sexes(): Array<KvpModel> 
  {
      const arr=
          [
              { key: 'F',  val: 'Feminin' },
              { key: 'M',  val: 'Masculin' },
          ];
      return arr;
  }

}
