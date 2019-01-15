import { Component, AfterViewInit, EventEmitter } from '@angular/core';
import { TarjetaDeck } from 'src/app/models/tarjeta.model';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { TarjetaService } from 'src/app/services/tarjeta.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab-search',
  templateUrl: './tab-search.page.html',
  styleUrls: ['./tab-search.page.scss'],
})
export class TabSearchPage implements AfterViewInit {
  tarjetas: TarjetaDeck[];
  distancia: String = '';
  private searchSubject = new BehaviorSubject<string>('');
  constructor(
    private tarjetaService: TarjetaService,
    private loadingService: LoaderService,
    private toast: ToastService,
    private router: Router,
  ) { }


  searchTarjetas(event: any) {
    console.log(event.target.value);
    this.searchSubject.next(event.target.value);
  }

  segmentChanged (ev: any) {
    this.distancia = ev.target.value;
  }

  ngAfterViewInit() {
    this.searchSubject.pipe(debounceTime(500), distinctUntilChanged()).subscribe(searchedText => {
      console.log(searchedText);
      if (!searchedText) { return this.tarjetas; }
      this.loadingService.presentLoading();
      this.tarjetaService.getTarjetasSearch(searchedText).subscribe((tarjetasServer) => {
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
