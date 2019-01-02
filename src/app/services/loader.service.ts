import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private isLoading = false;
  constructor(
    private loadingController: LoadingController
  ) { }

  async presentLoading() {
      this.isLoading = true;
      return await this.loadingController.create({
        duration: 5000,
        message : 'Espere',
        translucent: true,
      }).then(a => {
        a.present().then(() => {
          console.log('presented');
          if (!this.isLoading) {
            a.dismiss().then(() => console.log('abort presenting'));
          }
        });
      });
    }


  async dissminsLoading() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }
}
