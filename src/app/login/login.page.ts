import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Parse} from 'parse';
import { ToastService } from '../services/toast.service';
import { Storage } from '@ionic/storage';
import { version } from '../../../package.json';
@Component(
    {selector: 'app-login', templateUrl: './login.page.html', styleUrls: ['./login.page.scss']}
)
export class LoginPage implements OnInit {
  private username: string;
  private password: string;
  public version: string = version;
    constructor(
      private router: Router,
      private toast: ToastService,
      private storage: Storage,
      ) {}

    ngOnInit() {}
    goSignUp() {
        this.router.navigateByUrl('/signup');
    }
    signIn() {
        Parse.User
            .logIn(this.username, this.password)
            .then((resp) => {
                console.log('Logged in successfully', resp);
                // If you app has Tabs, set root to TabsPage
                this.storage.set('currentUser', resp.toJSON())
                    .then(succses => this.router.navigateByUrl('/home'))
                    .catch(error => console.error(error.message));
            }, err => {
                console.log('Error logging in', err);
                this.toast.presentErrorToast('Error logging in' + err.message);
            });
    }
}
