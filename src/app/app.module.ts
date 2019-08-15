import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { File } from '@ionic-native/file/ngx';
import { AgmCoreModule } from '@agm/core';
import c from '../../apiKeys';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        IonicStorageModule.forRoot(),
        AgmCoreModule.forRoot({
            apiKey: c.YOUR_GOOGLE_KEY
          })
    ],
    providers: [
        StatusBar,
        SplashScreen, {
            provide: RouteReuseStrategy,
            useClass: IonicRouteStrategy
        },
        ImagePicker,
        File
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
