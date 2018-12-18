import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabEditPage } from './tab-edit.page';

const routes: Routes = [
  {
    path: '',
    component: TabEditPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: TabEditPage }])
  ],
  declarations: [TabEditPage]
})
export class TabEditPageModule {}
