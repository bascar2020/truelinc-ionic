import { Component } from '@angular/core';
import { TarjetaDeck } from '../models/tarjeta.model';
import { TarjetaService } from '../services/tarjeta.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-tab-tarjetas',
  templateUrl: 'tab-tarjetas.page.html',
  styleUrls: ['tab-tarjetas.page.scss']
})
export class TabTarjetasPage {
  misTarjetas: TarjetaDeck[];
  copyOfMisTarjetas: TarjetaDeck[];
  constructor(
    private tarjetaService: TarjetaService,
    private toast: ToastService,
  ) { }

  ionViewWillEnter() {
    this.getTarjetas();
  }

  private getTarjetas() {

    this.tarjetaService.getTarjetasCurrentUser().subscribe((tarjetas) => {

      this.misTarjetas = tarjetas.map((t) => {
        return {
              id: t.id,
              nombre: t.get('Nombre'),
              empresa: t.get('Empresa'),
              cargo: t.get('Cargo'),
              logo: (t.get('LogoEmpresa') === undefined ? 'assets/img/noImage.jpg' : t.get('LogoEmpresa').url())
            };
      });
      this.copyOfMisTarjetas = Array.from(this.misTarjetas);
    }, (error) => {
      this.toast.presentErrorToast('Error al obtener tus tarjetas');
      console.error(error);
    });
  }

  generateUrl(tarjetaCode: string): string {
    return `/home/tabs/tarjetas/${tarjetaCode}`;
  }
  filteredTarjetas(tarjetasFiltered: TarjetaDeck[]) {
    this.misTarjetas = tarjetasFiltered;
  }

  doRefresh(event) {
    this.getTarjetas();
    event.target.complete();
  }

}
