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

  async presentLoading(msg: string = 'Espere') {
      this.isLoading = true;
      return await this.loadingController.create({
        duration: 5000,
        message : msg,
        translucent: true,
      }).then(a => {
        a.present().then(() => {
          if (!this.isLoading) {
            a.dismiss().then();
          }
        });
      });
    }



  async dissminsLoading() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then();
  }
}
