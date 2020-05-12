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

  jours(): Array<KvpModel> 
  {
    const arr=
    [
        { key: '1',  val: 'Lundi' },
        { key: '2',  val: 'Mardi' },
        { key: '3',  val: 'Mercredi' },
        { key: '4',  val: 'Jeudi' },
        { key: '5',  val: 'Vendredi' },
        { key: '6',  val: 'Samedi' },
        { key: '0',  val: 'Dimanche' },
    ];
    return arr;
  }

  joursForMDBSelect(): Array<{value: string, label: string}> 
  {
    const arr=
    [
        { value: '1',  label: 'Lundi' },
        { value: '2',  label: 'Mardi' },
        { value: '3',  label: 'Mercredi' },
        { value: '4',  label: 'Jeudi' },
        { value: '5',  label: 'Vendredi' },
        { value: '6',  label: 'Samedi' },
        { value: '0',  label: 'Dimanche' },
    ];
    return arr;
  }
}
