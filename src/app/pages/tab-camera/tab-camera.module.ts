import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabCameraPage } from './tab-camera.page';

const routes: Routes = [
  {
    path: '',
    component: TabCameraPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: TabCameraPage }])
  ],
  declarations: [TabCameraPage]
})
export class TabCameraPageModule {}
