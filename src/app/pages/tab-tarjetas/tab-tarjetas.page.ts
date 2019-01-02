import { Component, OnInit } from '@angular/core';
import { Tarjeta, TarjetaDeck } from '../../models/tarjeta.model';
import { TarjetaService } from '../../services/tarjeta.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab-tarjetas',
  templateUrl: './tab-tarjetas.page.html',
  styleUrls: ['./tab-tarjetas.page.scss'],
})
export class TabTarjetasPage implements OnInit {
  misTarjetas: TarjetaDeck[];

  constructor(
    private tarjetaService: TarjetaService,
  ) { }

  ngOnInit() {
    this.getTarjetas();
  }

  private getTarjetas() {
    this.tarjetaService.getTarjetasCurrentUser().subscribe(tarjetas => this.misTarjetas = tarjetas);
  }

  generateUrl(tarjetaCode: string): string {
    return `/home/tabs/tarjetas/${tarjetaCode}`;
  }



}
