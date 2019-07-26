import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-tab-camera',
  templateUrl: './tab-camera.page.html',
  styleUrls: ['./tab-camera.page.scss'],
})
export class TabCameraPage implements AfterViewInit {

  barcodeScannerOptions: BarcodeScannerOptions;
  encodeData: any;
  scannedData: {};

  constructor(
    private barcodeScanner: BarcodeScanner
  ) {
    // Options
    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true
    };
  }

  ngAfterViewInit() {
    this.scanCode();
  }

  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      alert('Barcode data ' + JSON.stringify(barcodeData));
      this.scannedData = barcodeData;
      console.log(this.scannedData);

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
