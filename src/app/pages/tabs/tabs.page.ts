import { Component, QueryList, ViewChildren } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { UserService } from 'src/app/services/user.service';
import { Platform, IonRouterOutlet } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage {

  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;
 
  barcodeScannerOptions: BarcodeScannerOptions;
  scannedData: {};
  encodeData: any;
  suscribe: any;
  
  constructor(
    private barcodeScanner: BarcodeScanner,
    private userService: UserService,
    private router: Router,
    public platform: Platform,
  ) {
    // Options
    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true
    };
    this.suscribe = this.platform.backButton.subscribeWithPriority(666666, () => {
      if (this.constructor.name === 'TabsPage') {
          if (this.router.url === '/home/tabs/tarjetas') {
              if (window.confirm('¿Quieres salir de Truelinc?')) {
                navigator['app'].exitApp();
              }
            }
      }
    });
  }
  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      if (!barcodeData.cancelled) {
        const newTarjeta = barcodeData.text.slice(15).trim();
        alert('Nueva tarjeta agregada');
        this.userService.followTarjeta(newTarjeta);

    }

    }).catch(err => {
      console.log('Error', err);
    });
  }
  encodedText() {
    this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, this.encodeData)
    .then((encodedData) => {
      console.log(encodedData);
      this.encodeData = encodedData;
    }, (err) => {
      console.log('Error occured : ' + err);
    });
  }
}
