import { Component } from '@angular/core';
import c from '../../apiKeys';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Parse } from 'parse';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private storage: Storage,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      Parse.initialize(`${c.YOUR_APP_ID}`, `${c.YOUR_JAVASCRIPT_KEY}`);
      Parse.serverURL = `${c.YOUR_PARSE_SERVER}`;
      Parse.User.currentAsync().then(user => {
        if (user) {
          this.router.navigateByUrl(user ? '/home' : '');
          this.storage.set('currentUser', user.toJSON());
        } else {
          this.router.navigateByUrl(user ? '/home' : '');
        }
      }, err => {
        console.log('Error getting logged user');
        this.storage.set('currentUser', null);
        this.router.navigateByUrl('');
      });
    });
  }
}
