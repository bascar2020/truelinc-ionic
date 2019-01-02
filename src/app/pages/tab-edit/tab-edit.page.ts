import { Component, OnInit } from '@angular/core';
import { Parse } from 'parse';
import { Router } from '@angular/router';
import {ToastController} from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab-edit',
  templateUrl: './tab-edit.page.html',
  styleUrls: ['./tab-edit.page.scss'],
})
export class TabEditPage implements OnInit {


  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private storage: Storage,
  ) { }

  ngOnInit() {
  }

  logOut() {
    Parse.User.logOut().then((resp) => {
      console.log('Logged out successfully', resp);
      this.router.navigateByUrl('/');
      this.storage.set('currentUser', null);
    }, err => {
      console.log('Error logging out', err);
      this.presentToast('Error logging out');
    });
  }
  async presentToast(msj) {
    const toast = await this
        .toastCtrl
        .create({message: msj, duration: 2000});
    return await toast.present();
  }
}
