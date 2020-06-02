import {Component, OnInit} from '@angular/core';

import {Parse} from 'parse';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { AlertService } from '../services/alert.service';


@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.page.html',
  styleUrls: ['./recover-password.page.scss'],
})
export class RecoverPasswordPage implements OnInit {

  public username: string;
  public reset_form: FormGroup;
 
  constructor(
    private alert: AlertService,
  ) { }
  ngOnInit() {

    this.reset_form = new FormGroup({
      'correo': new FormControl('', [
        Validators.required,
        Validators.email
      ])
    });

  }

  resetPassword() {
    let msg = 'La solicitud de restablecimiento de contraseña se envió correctamente';
    const asyncFunction = async () => {
      await Parse.User.requestPasswordReset(this.reset_form.value.correo).then(
        (resp) => {
          console.log('Password reset request was sent successfully');
        })
        .catch((error) => {
          console.error('The login failed with error: ' + error.code + ' ' + error.message);
          msg = error.message;
        });
      };
       asyncFunction().then(_ => this.alert.presentAlert(msg));
  }
  get correo() {
    return this.reset_form.get('correo');
  }

}
