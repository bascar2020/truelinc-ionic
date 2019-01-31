import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Parse} from 'parse';
import { ToastService } from '../services/toast.service';

@Component(
    {selector: 'app-login', templateUrl: './login.page.html', styleUrls: ['./login.page.scss']}
)
export class LoginPage implements OnInit {
  private username: string;
  private password: string;
    constructor(
      private router: Router,
      private toast: ToastService,
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
                this.router.navigateByUrl('/home');
            }, err => {
                console.log('Error logging in', err);
                this.toast.presentErrorToast('Error logging in' + err.message);
            });
    }
}
