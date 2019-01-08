import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabTarjetasPage } from './tab-tarjetas.page';
import { TarjetasListComponent } from 'src/app/component/tarjetas-list/tarjetas-list.component';
import { SearchComponent } from 'src/app/component/search/search.component';

const routes: Routes = [
  { path : '',
    component: TabTarjetasPage,
  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [ TabTarjetasPage, TarjetasListComponent, SearchComponent]
})
export class TabTarjetasPageModule {}
