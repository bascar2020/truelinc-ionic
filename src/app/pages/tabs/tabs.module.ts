import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { TabsRoutingModule } from './tabs.router.module';
import { TabsPage } from './tabs.page';
import { TabTarjetasPageModule } from '../tab-tarjetas/tab-tarjetas.module';
import { TabCameraPageModule } from '../tab-camera/tab-camera.module';
import { TabSearchPageModule } from '../tab-search/tab-search.module';
import { TabEditPageModule } from '../tab-edit/tab-edit.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsRoutingModule,
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
