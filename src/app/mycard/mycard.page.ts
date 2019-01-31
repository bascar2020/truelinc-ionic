import { Component, OnInit } from '@angular/core';
import { Tarjeta } from '../models/tarjeta.model';
import { TarjetaService } from '../services/tarjeta.service';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-mycard',
  templateUrl: './mycard.page.html',
  styleUrls: ['./mycard.page.scss'],
})
export class MycardPage implements OnInit {
  miTarjeta: Tarjeta;

  constructor(
    private tarjetaService: TarjetaService,
    private activeRoute: ActivatedRoute,
    private loadingService: LoaderService,
  ) { }

  ngOnInit() {
    this.getTarjeta();
  }

  private getTarjeta() {
    this.loadingService.presentLoading();
    const id = this.activeRoute.snapshot.paramMap.get('id');
    this.tarjetaService.getTargetasById(id).subscribe((t) => {
        t = t[0];
      this.miTarjeta = {
        id: t.id,
        nombre: t.get('Nombre').toString(),
        empresa: t.get('Empresa'),
        cargo: t.get('Cargo'),
        logo: (t.get('LogoEmpresa') === undefined ? 'assets/img/noImage.jpg' : t.get('LogoEmpresa').url()),
        foto: (t.get('Foto') === undefined ? 'assets/img/noImage.jpg' : t.get('Foto').url()),
        facebook: t.get('facebook'),
        generalRate: t.get('generalRate'),
        twit: t.get('Twit'),
        privade: t.get('Privada'),
        telefono: t.get('Telefono'),
        www: t.get('www'),
        ciudad: t.get('Ciudad'),
        tags: t.get('tags'),
        email: t.get('Email'),
        qr: (t.get('QR') === undefined ? 'assets/img/no-qr.png' : t.get('QR').url()),
        geopoint: t.get('GeoPoint'),
        twiter: t.get('twiter'),
        direccion : t.get('Direccion'),
        instagram : t.get('instagram'),

      };
      this.loadingService.dissminsLoading();
     });
  }
}
