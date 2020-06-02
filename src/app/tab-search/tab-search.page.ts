import { Component, AfterViewInit, OnInit } from '@angular/core';
import { TarjetaDeck } from 'src/app/models/tarjeta.model';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { TarjetaService } from 'src/app/services/tarjeta.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-tab-search',
  templateUrl: 'tab-search.page.html',
  styleUrls: ['tab-search.page.scss']
})
export class TabSearchPage implements OnInit, AfterViewInit {
  public tarjetas: TarjetaDeck[];
  public distanceKm = 0;
  public actualGeoposition: Geoposition;
  public query: SearchQuery = new SearchQuery();
  private searchSubject = new BehaviorSubject<SearchQuery>(new SearchQuery());

  constructor(
    private geolocation: Geolocation,
    private tarjetaService: TarjetaService,
    private loadingService: LoaderService,
    private toast: ToastService,
    private router: Router,
  ) { }


  searchTarjetas(event: any) {
    this.query.textQuery = event.target.value.trim();
    if (event.target.value !== '') {
      this.searchSubject.next(this.query);
    }
  }

  segmentChanged(ev: any) {
    let distanceKm = 0;
    switch (ev.target.value) {
      case 'cerca':
        distanceKm = 10;
        break;
      case 'ciudad':
        distanceKm = 100;
        break;
      case 'nacional':
        distanceKm = 1000;
        break;
      default:
        distanceKm = 10;
        break;
    }
    this.query.distanceKm = distanceKm;
    if (this.query.textQuery.trim() !== '' && this.query.distanceKm !== 0) {
      this.searchSubject.next(this.query);
    }
  }

  ngOnInit() {
    this.loadingService.presentLoading('Ubicando...');
    this.geolocation.getCurrentPosition().then((resp) => {
      this.query.geoposition = resp;
      this.loadingService.dissminsLoading();
    }).catch((error) => {
      this.toast.presentErrorToast('Error getting location');
      this.loadingService.dissminsLoading();
      console.log('Error getting location', error);
    });
    const watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
    // data can be a set of coordinates, or an error (if an error occurred).
    // data.coords.latitude
    // data.coords.longitude
    //  console.log('watch coords', data.coords);
      this.query.geoposition = data;
    });
  }
  ngAfterViewInit() {
    this.searchSubject.pipe(debounceTime(700)).subscribe(searchedText => {
      // console.log(searchedText);
      // console.log(this.actualGeoposition);
      if (searchedText.textQuery.trim() === '') { return this.tarjetas; }
      if (searchedText.distanceKm === 0) {
          this.toast.presentErrorToast('Seleccione una distancia');
          return this.tarjetas;
        }
      this.loadingService.presentLoading('Buscando');
      this.tarjetaService.getTarjetasSearch(searchedText.textQuery, searchedText.distanceKm, searchedText.geoposition)
        .subscribe((tarjetasServer) => {
          this.tarjetas = tarjetasServer.map((t) => {
            return {
              id: t.id,
              nombre: t.get('Nombre'),
              empresa: t.get('Empresa'),
              cargo: t.get('Cargo'),
              logo: (t.get('LogoEmpresa') === undefined ? 'assets/img/noImage.jpg' : t.get('LogoEmpresa').url())
            };
          });
          this.loadingService.dissminsLoading();
        }, (error) => {
          this.loadingService.dissminsLoading();
          this.toast.presentErrorToast('Error al obtener tus tarjetas');
          console.error(error);
        });
    });
  }



  go(id: string) {
    this.router.navigateByUrl('/home/tabs/search/' + id);
  }
}

class SearchQuery {
  textQuery: string;
  geoposition: Geoposition;
  distanceKm: number;
  constructor() {
    this.textQuery = '';
    this.distanceKm = 10;
  }
  print() {
    console.log(
      this.textQuery,
      this.geoposition,
      this.distanceKm
    );
  }

}
