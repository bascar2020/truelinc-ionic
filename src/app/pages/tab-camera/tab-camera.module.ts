import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabCameraPage } from './tab-camera.page';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: TabCameraPage }])
  ],
  declarations: [TabCameraPage],
  providers: [
    BarcodeScanner,
  ]
})
export class TabCameraPageModule {}
