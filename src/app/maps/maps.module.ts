import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {AgmCoreModule} from '@agm/core';

import { IonicModule } from '@ionic/angular';

import { MapsPage } from './maps.page';
import { Geolocation } from '@ionic-native/geolocation/ngx';


const routes: Routes = [
  {
    path: '',
    component: MapsPage
  }
];

@NgModule({
  providers: [
    Geolocation
  ],
  imports: [
    AgmCoreModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [MapsPage]
})
export class MapsPageModule {}
