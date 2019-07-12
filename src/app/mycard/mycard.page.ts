import { Component, OnInit } from '@angular/core';
import { Tarjeta } from '../models/tarjeta.model';
import { TarjetaService } from '../services/tarjeta.service';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from '../services/loader.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-mycard',
  templateUrl: './mycard.page.html',
  styleUrls: ['./mycard.page.scss']
})
export class MycardPage implements OnInit {
  miTarjeta: Tarjeta;
  btnFollow: String;
  btnFollowText: String;
  isFollowing: Boolean;

  constructor(
    private tarjetaService: TarjetaService,
    private activeRoute: ActivatedRoute,
    private loadingService: LoaderService,
    public alertController: AlertController,
  ) {}

  ngOnInit() {
    this.getTarjeta();
    this.isFollowing = false;
    this.btnFollow = 'danger';
    this.btnFollowText = 'Dejar de seguir';
    this.tarjetaService
      .getStateTarjeta(this.activeRoute.snapshot.paramMap.get('id'))
      .then(data => {
        if (data) {
          this.btnFollow = 'danger';
          this.btnFollowText = 'Dejar de seguir';
          this.isFollowing = true;
        } else {
          this.btnFollow = 'primary';
          this.btnFollowText = 'Seguir tarjeta';
          this.isFollowing = false;
        }
      });

  }

  private getTarjeta() {
    this.loadingService.presentLoading();
    const id = this.activeRoute.snapshot.paramMap.get('id');
    this.tarjetaService.getTargetasById(id).subscribe(t => {
      t = t[0];
      this.miTarjeta = {
        id: t.id,
        nombre: t.get('Nombre').toString(),
        empresa: t.get('Empresa'),
        cargo: t.get('Cargo'),
        logo:
          t.get('LogoEmpresa') === undefined
            ? 'assets/img/noImage.jpg'
            : t.get('LogoEmpresa').url(),
        foto:
          t.get('Foto') === undefined
            ? 'assets/img/noImage.jpg'
            : t.get('Foto').url(),
        facebook: t.get('facebook'),
        generalRate: t.get('generalRate'),
        twit: t.get('Twit'),
        privade: t.get('Privada'),
        telefono: t.get('Telefono'),
        www: t.get('www'),
        ciudad: t.get('Ciudad'),
        tags: t.get('tags'),
        email: t.get('Email'),
        qr:
          t.get('QR') === undefined
            ? 'assets/img/no-qr.png'
            : t.get('QR').url(),
        geopoint: t.get('GeoPoint'),
        twiter: t.get('twiter'),
        direccion: t.get('Direccion'),
        instagram: t.get('instagram')
      };
      this.loadingService.dissminsLoading();
    });
  }
  public follow() {
    if ( this.isFollowing ) {
        this.presentAlertConfirm();
      } else {
      this.btnFollow = 'danger';
      this.btnFollowText = 'Dejar de seguir';
      this.isFollowing = true;
    }
  }

  private async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: '¿desea elminar la tarjeta?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
            this.btnFollow = 'primary';
          this.btnFollowText = 'Seguir tarjeta';
          this.isFollowing = false;
          }
        }
      ]
    });
    await alert.present();
  }
}
