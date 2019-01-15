import { Component, OnInit } from '@angular/core';
import { TarjetaDeck } from '../../models/tarjeta.model';
import { TarjetaService } from '../../services/tarjeta.service';
import { LoaderService } from '../../services/loader.service';
import { ToastService } from 'src/app/services/toast.service';


@Component({
  selector: 'app-tab-tarjetas',
  templateUrl: './tab-tarjetas.page.html',
  styleUrls: ['./tab-tarjetas.page.scss'],
})
export class TabTarjetasPage implements OnInit {
  misTarjetas: TarjetaDeck[];
  copyOfMisTarjetas: TarjetaDeck[];

  constructor(
    private tarjetaService: TarjetaService,
    private loadingService: LoaderService,
    private toast: ToastService,
  ) { }

  ngOnInit() {
    this.getTarjetas();
  }

  private getTarjetas() {
    this.loadingService.presentLoading();
    this.tarjetaService.getTarjetasCurrentUser().subscribe((tarjetas) => {
      // console.log(tarjetas);
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
      this.loadingService.dissminsLoading();
    }, () => {
      this.loadingService.dissminsLoading();
      this.toast.presentErrorToast('Error al optener tus cartas');
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
