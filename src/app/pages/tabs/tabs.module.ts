import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { TabsRoutingModule } from './tabs.router.module';
import { TabsPage } from './tabs.page';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsRoutingModule,
  ],
  declarations: [TabsPage],
  providers: [
    BarcodeScanner,
  ]
})
export class TabsPageModule {}
