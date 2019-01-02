import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Parse} from 'parse';
import {ToastController} from '@ionic/angular';

@Component(
    {selector: 'app-login', templateUrl: './login.page.html', styleUrls: ['./login.page.scss']}
)
export class LoginPage implements OnInit {
  private username: string;
  private password: string;
    constructor(
      private router: Router,
      private toastCtrl: ToastController,
      ) {}

    ngOnInit() {}
    goLogin() {
        this.router.navigateByUrl('/home');
    }
    signUp() {
        Parse.User
            .signUp(this.username, this.password)
            .then((resp) => {
                console.log('Logged in successfully', resp);

                // Clears up the form
                this.username = '';
                this.password = '';
                this.presentToast('successfully');

            }, err => {
                console.log('Error signing in', err);
                this.presentToast(err.message);
            });
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
                this.presentToast(err.message);
            });
    }

    async presentToast(msj) {
        const toast = await this
            .toastCtrl
            .create({message: msj, position: 'top', duration: 2000});
      return await toast.present();
    }

}
