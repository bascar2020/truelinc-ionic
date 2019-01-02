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

    public getTarjetasCurrentUser(): Observable < TarjetaDeck[] > {
      const tarjetas: TarjetaDeck[] = [];
      this.storage.get('currentUser').then(async (val) => {
        const Tarjetas = Parse.Object.extend('Tarjetas');
        const query = new Parse.Query(Tarjetas);
        query.containedIn('objectId', val.tarjetas);
        query.descending('Empresa');
        const results = await query.find();
        results.map(t => (
          tarjetas.push({
            id: t.id,
            nombre: t.get('Nombre'),
            empresa: t.get('Empresa'),
            cargo: t.get('Cargo'),
            logo: (t.get('LogoEmpresa') === undefined ? 'assets/img/noImage.jpg' : t.get('LogoEmpresa').url())
          })
        ));
      });
      return of(tarjetas);
    }

    public getTargetasById(id: String): Observable<Parse.Object> {
      const Tarjetas = Parse.Object.extend('Tarjetas');
      const query = new Parse.Query(Tarjetas);
      query.equalTo('objectId', id);
         return from(query.find());
    }
}
