import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SignupPage } from './signup.page';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Base64 } from '@ionic-native/base64/ngx';

const routes: Routes = [
  {
    path: '',
    component: SignupPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ],
  declarations: [SignupPage],
  providers: [
    BarcodeScanner,
    Base64,
  ]
})
export class SignupPageModule {}
