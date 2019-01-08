import { Injectable } from '@angular/core';
import { Parse } from 'parse';
import { Storage } from '@ionic/storage';
import { Tarjeta, TarjetaDeck } from '../models/tarjeta.model';
import { Observable, of , from} from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class TarjetaService {

  constructor(
    private storage: Storage) {}

    public getTarjetasCurrentUser(): Observable < Parse.Object[] > {
      const tarjetas: TarjetaDeck[] = [];
      return from (this.storage.get('currentUser').then(
      (val) => {
      const Tarjetas = Parse.Object.extend('Tarjetas');
      const query = new Parse.Query(Tarjetas);
      console.log(val);
      query.containedIn('objectId', val.tarjetas);
      query.descending('Empresa');
      return (query.find());
      },
      (error) => {
      console.error(error);
      },
      )
      );
      }

    public getTargetasById(id: String): Observable<Parse.Object> {
      const Tarjetas = Parse.Object.extend('Tarjetas');
      const query = new Parse.Query(Tarjetas);
      query.equalTo('objectId', id);
         return from(query.find());
    }
}
