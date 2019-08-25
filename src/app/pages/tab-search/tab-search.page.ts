import { Component, AfterViewInit, OnInit } from '@angular/core';
import { TarjetaDeck } from 'src/app/models/tarjeta.model';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { TarjetaService } from 'src/app/services/tarjeta.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
@Component({
  selector: 'app-tab-search',
  templateUrl: './tab-search.page.html',
  styleUrls: ['./tab-search.page.scss'],
})
export class TabSearchPage implements OnInit, AfterViewInit {
  tarjetas: TarjetaDeck[];
  distanceKm: Number = 0;
  actualGeoposition: Geoposition;

  private searchSubject = new BehaviorSubject<string>('');
  constructor(
    private geolocation: Geolocation,
    private tarjetaService: TarjetaService,
    private loadingService: LoaderService,
    private toast: ToastService,
    private router: Router,
  ) { }


  searchTarjetas(event: any) {
    this.searchSubject.next(event.target.value);
  }

  segmentChanged (ev: any) {
    this.distanceKm = ev.target.value;
    switch (ev.target.value) {
      case 'cerca':
        this.distanceKm = 10;
        break;
      case 'ciudad':
        this.distanceKm = 100;
        break;
      case 'nacional':
        this.distanceKm = 1000;
        break;
      default:
        this.distanceKm = 10;
        break;
    }
  }

  ngOnInit() {
      this.geolocation.getCurrentPosition().then((resp) => {
          this.actualGeoposition = resp;
      }).catch((error) => {
        console.log('Error getting location', error);
      });
  }
  ngAfterViewInit() {
    this.searchSubject.pipe(debounceTime(500), distinctUntilChanged()).subscribe(searchedText => {
      console.log(searchedText);
      console.log(this.actualGeoposition);
      if (!searchedText) { return this.tarjetas; }
      this.loadingService.presentLoading();
      this.tarjetaService.getTarjetasSearch(searchedText, this.distanceKm, this.actualGeoposition).subscribe((tarjetasServer) => {
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
      }, () => {
        this.loadingService.dissminsLoading();
        this.toast.presentErrorToast('Error al obtenert tus cartas');
      });
    });
  }

  go(id: string) {
    this.router.navigateByUrl('/home/tabs/search/' + id);
  }
}
