import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabEditPage } from './tab-edit.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { TabEditPageRoutingModule } from './tab-edit-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    TabEditPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [TabEditPage]
})
export class TabEditPageModule {}
