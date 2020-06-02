import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabTarjetasPage } from './tab-tarjetas.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { TabTarjetasPageRoutingModule } from './tab-tarjetas-routing.module';
import { SearchComponent } from '../component/search/search.component';
import { TarjetasListComponent } from '../component/tarjetas-list/tarjetas-list.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    TabTarjetasPageRoutingModule
  ],
  declarations: [ TabTarjetasPage, TarjetasListComponent, SearchComponent]
})
export class TabTarjetasPageModule {}
