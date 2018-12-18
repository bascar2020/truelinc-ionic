import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabSearchPage } from './tab-search.page';

const routes: Routes = [
  {
    path: '',
    component: TabSearchPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: TabSearchPage }])
  ],
  declarations: [TabSearchPage]
})
export class TabSearchPageModule {}
