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
      return from (this.storage.get('currentUser').then(
        (val) => {
          const Tarjetas = Parse.Object.extend('Tarjetas');
          const query = new Parse.Query(Tarjetas);
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

    public getTarjetasSearch(substring: String): Observable < Parse.Object> {
        const Tarjetas = Parse
            .Object
            .extend('Tarjetas');
        const queryName = new Parse.Query(Tarjetas).equalTo('Privada', false).contains('Nombre', substring);
        const queryEmpresa = new Parse.Query(Tarjetas).equalTo('Privada', false).contains('Empresa', substring);
        const queryTag = new Parse.Query(Tarjetas).equalTo('Privada', false).containedIn('tags', [substring]);
        const compoundQuery = new Parse
            .Query
            .or(
                queryTag,
                queryName,
                queryEmpresa,
            );
        return from(compoundQuery.find());
    }
}
