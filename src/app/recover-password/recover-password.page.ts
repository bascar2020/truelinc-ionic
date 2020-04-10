import {Component, OnInit} from '@angular/core';

import {Parse} from 'parse';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AlertService } from '../services/alert.service';
import { ignoreElements } from 'rxjs/operators';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.page.html',
  styleUrls: ['./recover-password.page.scss'],
})
export class RecoverPasswordPage implements OnInit {

  public username: string;
  public reset_form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private alert: AlertService,
  ) { }
  ngOnInit() {
    this.reset_form = this.formBuilder.group({
      correo: new FormControl('', Validators.compose([ Validators.required, Validators.email])),
    });
  }

  resetPassword() {
    let msg = 'La solicitud de restablecimiento de contraseña se envió correctamente';
    const asyncFunction = async () => {
      await Parse.User.requestPasswordReset(this.reset_form.value.correo).then(
        (resp) => {
          console.log('Password reset request was sent successfully');
        })
        .catch(function(error) {
          console.log('The login failed with error: ' + error.code + ' ' + error.message);
          msg = error.message;
        });
      };
       asyncFunction().then(_ => this.alert.presentAlert(msg));
  }
  get correo() {
    return this.reset_form.get('correo');
  }

}
