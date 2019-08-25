import { Injectable } from '@angular/core';
import { Parse } from 'parse';
import { Tarjeta, TarjetaDeck } from '../models/tarjeta.model';
import { Observable, of , from} from 'rxjs';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';




@Injectable({
  providedIn: 'root'
})
export class TarjetaService {

  constructor() {}

    public getTarjetasCurrentUser(): Observable < Parse.Object> {
          const Tarjetas = Parse.Object.extend('Tarjetas');
          const query = new Parse.Query(Tarjetas);
          query.containedIn('objectId', Parse.User.current().get('tarjetas'));
          query.descending('Empresa');
          return from(query.find());
    }

    public getTargetasById(id: String): Observable<Parse.Object> {
      const Tarjetas = Parse.Object.extend('Tarjetas');
      const query = new Parse.Query(Tarjetas);
      query.equalTo('objectId', id);
         return from(query.find());
    }

    public getTarjetasSearch(substring: String, distance: Number, position: Geoposition ): Observable < Parse.Object> {

        const location = new Parse.GeoPoint({latitude: position.coords.latitude, longitude: position.coords.longitude});
        const Tarjetas = Parse
            .Object
            .extend('Tarjetas');
        const queryName = new Parse.Query(Tarjetas).equalTo('Privada', false).contains('Nombre', substring);
        const queryEmpresa = new Parse.Query(Tarjetas).equalTo('Privada', false).contains('Empresa', substring);
        const queryTag = new Parse.Query(Tarjetas).equalTo('Privada', false).containedIn('tags', [substring]);
        const queryDistance = new Parse.Query(Tarjetas).equalTo('Privada', false).withinKilometers('GeoPoint', location, distance, true);
        const compoundQuery = new Parse.Query
            .or(
                queryTag,
                queryName,
                queryEmpresa,
            );
        const finalQuery = new Parse.Query
              .and(queryDistance, compoundQuery);

        return from(finalQuery.find());
    }

    public async getStateTarjeta(id: String) {

      const response = Parse.User.current().get('tarjetas').find(x => x === id);
      return response ? true : false ;
    }
}
