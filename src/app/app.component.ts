import { Component } from '@angular/core';
import c from '../../apiKeys';
import { Platform } from '@ionic/angular';

import { Parse } from 'parse';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private router: Router,
    private storage: Storage,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {

      Parse.initialize(`${c.YOUR_APP_ID}`, `${c.YOUR_JAVASCRIPT_KEY}`);
      Parse.serverURL = `${c.YOUR_PARSE_SERVER}`;
      Parse.enableLocalDatastore();
      Parse.User.currentAsync().then(user => {
        if (user) {
          this.storage.set('currentUser', user.toJSON())
          .then(succses => this.router.navigateByUrl(user ? '/home' : ''))
          .catch(error => console.error(error.message));
        } else {
          this.router.navigateByUrl(user ? '/home' : '');
        }
      }, err => {
        console.error('Error getting logged user', err);
        this.storage.set('currentUser', null);
        this.router.navigateByUrl('');
      });

    });
  }
}
