import {Component, OnInit} from '@angular/core';

import {Parse} from 'parse';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AlertService } from '../services/alert.service';
import { ignoreElements } from 'rxjs/operators';

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
     Parse.User.requestPasswordReset(this.reset_form.value.correo).then(
      async (resp) => {
        console.log('Password reset request was sent successfully');
        console.log(resp);
        return 'OK';
      })
      .catch(function(error) {
        console.log('The login failed with error: ' + error.code + ' ' + error.message);
        msg = error.message;
        this.alert.presentAlert(msg);
        return msg;
      });

  }
  get correo() {
    return this.reset_form.get('correo');
  }

}
