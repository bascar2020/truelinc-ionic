import { Component, OnInit } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage {

  barcodeScannerOptions: BarcodeScannerOptions;
  encodeData: any;
  scannedData: {};

  constructor(
    private barcodeScanner: BarcodeScanner,
    private userService: UserService,
  ) {
    // Options
    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true
    };
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
