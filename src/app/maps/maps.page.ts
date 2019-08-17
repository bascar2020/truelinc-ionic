import { Component, OnInit } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { MouseEvent } from '@agm/core';
import { Parse } from 'parse';
import { LoaderService } from 'src/app/services/loader.service';
import { Location } from '@angular/common';
export interface Marker {
  lat?: number;
  lng?: number;
  label?: string;
}

@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})

export class MapsPage implements OnInit {
  geoposition: Geoposition;
  lat = 4.640071;
  lng = -74.0719561;

  constructor(
    private geolocation: Geolocation,
    private loadingService: LoaderService,
    private location: Location,
  ) { }

  ngOnInit() {
    if ( Parse.User.current().get('mi_tarjeta').get('GeoPoint') != null) {
      const punto = Parse.User.current().get('mi_tarjeta').get('GeoPoint').toJSON();
      this.lat = punto.latitude;
      this.lng = punto.longitude;
    } else {
      this.getMyLocation();
    }
  }

  mapClicked($event: MouseEvent) {
    console.log(MouseEvent);
      this.lat = $event.coords.lat;
      this.lng = $event.coords.lng;
  }

  getMyLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log('Current Position', resp.coords);
      this.geoposition = resp;
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;

     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  async onSave() {
    this.loadingService.presentLoading();
    const point = new Parse.GeoPoint({latitude: this.lat, longitude: this.lng});
    Parse.User.current().get('mi_tarjeta').set('GeoPoint', point);
    await Parse.User.current().get('mi_tarjeta').save();
    this.loadingService.dissminsLoading();
    this.location.back();
  }


}


