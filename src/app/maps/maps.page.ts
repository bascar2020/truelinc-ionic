import { Component, OnInit } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';

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
  currentMarket: Marker;
  markers: Array<Marker> = [];

  constructor(
    private geolocation: Geolocation
  ) { }

  ngOnInit() {
    this.getMyLocation();
    // this.currentMarket.label = 'Localizando ...';
    // this.currentMarket.lat = 4.640071;
    // this.currentMarket.lng = -74.0719561;
   // this.markers = [this.currentMarket] || [];
  }
  getMyLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude;
      // resp.coords.longitude;
      console.log('Current Position', resp.coords);
      this.geoposition = resp;
      console.log(this.geoposition);
      // this.currentMarket.lat = resp.coords.latitude;
      // this.currentMarket.lng = resp.coords.longitude;

     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }


}


