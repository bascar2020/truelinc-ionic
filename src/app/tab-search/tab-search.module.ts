import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabSearchPage } from './tab-search.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { TabSearchPageRoutingModule } from './tab-search-routing.module';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: TabSearchPage }]),
    TabSearchPageRoutingModule,
  ],
  providers: [
    Geolocation
  ],
  declarations: [TabSearchPage]
})
export class TabSearchPageModule {}
