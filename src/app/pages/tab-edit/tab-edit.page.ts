import { Component, OnInit } from '@angular/core';
import { Parse } from 'parse';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoaderService } from 'src/app/services/loader.service';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { TarjetaService } from 'src/app/services/tarjeta.service';
import { Tarjeta } from 'src/app/models/tarjeta.model';

@Component({
  selector: 'app-tab-edit',
  templateUrl: './tab-edit.page.html',
  styleUrls: ['./tab-edit.page.scss'],
})
export class TabEditPage implements OnInit {

  editarForm: FormGroup;
  objectId: String;
  imageResponse: any;
  options: any;
  miTarjeta: Tarjeta;
  objetoTarjeta: any;
  constructor(
    private tarjetaService: TarjetaService,
    private router: Router,
    private toastCtrl: ToastController,
    private storage: Storage,
    private formBuilder: FormBuilder,
    private loadingService: LoaderService,
    private imagePicker: ImagePicker,
  ) { }

ngOnInit() {
  const pattern = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
  this.editarForm = this.formBuilder
                .group({
                    empresa: [
                        '',
                        [
                            Validators.required, Validators.minLength(4)
                        ]
                    ],
                    nombre: [
                        '',
                        [
                            Validators.required, Validators.minLength(2)
                        ]
                    ],
                    cargo: [
                        '',
                        [
                            Validators.required, Validators.minLength(2)
                        ]
                    ],
                    twit: [
                        '',
                        [Validators.minLength(10)]
                    ],
                    // tags
                    telefono: [
                        '',
                        [
                            Validators.required, Validators.pattern('^[0-9]*$')
                        ]
                    ],
                    direccion: [
                        '',
                        [Validators.required]
                    ],
                    correo: [
                        '',
                        [Validators.required, Validators.email]
                    ],
                    facebook: [
                        '',
                        [Validators.pattern(pattern)]
                    ],
                    instagram: [
                        '',
                        [Validators.pattern(pattern)]
                    ],
                    web: [
                        '',
                        [Validators.pattern(pattern)]
                    ],
                    privada: false
                });

    this.storage
        .get('currentUser')
        .then(async (val) => {
         await this.tarjetaService.getTargetasById(val.mi_tarjeta.objectId).subscribe(t => {
            t = t[0];
            this.objetoTarjeta = t;
            this.miTarjeta = t;
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

          this.editarForm.get('empresa').setValue(this.miTarjeta.empresa);
          this.editarForm.get('nombre').setValue(this.miTarjeta.nombre);
          this.editarForm.get('cargo').setValue(this.miTarjeta.cargo);
          this.editarForm.get('twit').setValue(this.miTarjeta.twit);
          this.editarForm.get('telefono').setValue(this.miTarjeta.telefono);
          this.editarForm.get('direccion').setValue(this.miTarjeta.direccion);
          this.editarForm.get('correo').setValue(this.miTarjeta.email);
          this.editarForm.get('facebook').setValue(this.miTarjeta.facebook);
          this.editarForm.get('instagram').setValue(this.miTarjeta.instagram);
          this.editarForm.get('web').setValue(this.miTarjeta.www);
          this.editarForm.get('privada').setValue(this.miTarjeta.privade);
        });
        }, (error) => {
            console.error(error);
        });
}
  async onSubmit() {

    this.loadingService.presentLoading();
              this.objetoTarjeta.set('Empresa', this.editarForm.value.empresa);
              this.objetoTarjeta.set('Nombre', this.editarForm.value.nombre);
              this.objetoTarjeta.set('Privada', this.editarForm.value.privada);
              this.objetoTarjeta.set('Direccion', this.editarForm.value.direccion);
              this.objetoTarjeta.set('Telefono', this.editarForm.value.telefono);
              this.objetoTarjeta.set('Email', this.editarForm.value.correo);
              this.objetoTarjeta.set('Cargo', this.editarForm.value.cargo);
              this.objetoTarjeta.set('Twit', this.editarForm.value.twit);
              this.objetoTarjeta.set('facebook', this.editarForm.value.facebook);
              this.objetoTarjeta.set('instagram', this.editarForm.value.instagram);
              this.objetoTarjeta.set('www', this.editarForm.value.web);
              await this.objetoTarjeta.save();
      this.loadingService.dissminsLoading();
  }

  logOut() {
    Parse.User.logOut().then((resp) => {
      console.log('Logged out successfully', resp);
      this.storage.set('currentUser', null);
      this.router.navigateByUrl('/');
    }, err => {
      console.log('Error logging out', err);
      this.presentToast('Error logging out');
    });
  }
  async presentToast(msj) {
    const toast = await this
        .toastCtrl
        .create({message: msj, duration: 2000});
    return await toast.present();
  }

  getImages() {
    this.options = {
      // Android only. Max images to be selected, defaults to 15. If this is set to 1, upon
      // selection of a single image, the plugin will return it.
      // maximumImagesCount: 3,
      // max width and height to allow the images to be.  Will keep aspect
      // ratio no matter what.  So if both are 800, the returned image
      // will be at most 800 pixels wide and 800 pixels tall.  If the width is
      // 800 and height 0 the image will be 800 pixels wide if the source
      // is at least that wide.
      width: 200,
      // height: 200,
      // quality of resized image, defaults to 100
      quality: 25,

      // output type, defaults to FILE_URIs.
      // available options are
      // window.imagePicker.OutputType.FILE_URI (0) or
      // window.imagePicker.OutputType.BASE64_STRING (1)
      outputType: 1
    };
    this.imageResponse = [];
    this.imagePicker.getPictures(this.options).then((results) => {
      for (let i = 0; i < results.length; i++) {
        this.imageResponse.push('data:image/jpeg;base64,' + results[i]);
      }
    }, (err) => {
      alert(err);
    });
  }



get empresa() {
   return this.editarForm.get('empresa');
}
get nombre() {
  return this.editarForm.get('nombre');
}
get cargo() {
  return this.editarForm.get('cargo');
}
get twit() {
  return this.editarForm.get('twit');
}
get telefono() {
  return this.editarForm.get('telefono');
}
get direccion() {
  return this.editarForm.get('direccion');
}
get correo() {
  return this.editarForm.get('correo');
}
get facebook() {
  return this.editarForm.get('facebook');
}
get instagram() {
  return this.editarForm.get('instagram');
}
get web() {
  return this.editarForm.get('web');
}
}
