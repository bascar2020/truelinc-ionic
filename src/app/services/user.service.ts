import { Injectable } from '@angular/core';
import { Parse } from 'parse';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
  ) { }

  /**
   * followTarjeta
   */
  public followTarjeta(idTarjeta: string) {
      Parse.User.current().addUnique('tarjetas', idTarjeta).save().pin();
  }

  public unfollowTarjeta (idTarjeta: string) {
    Parse.User.current().remove('tarjetas', idTarjeta).save().pin();
  }
}
