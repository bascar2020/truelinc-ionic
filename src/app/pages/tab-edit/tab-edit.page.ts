import { Component, OnInit } from '@angular/core';
import { Parse } from 'parse';
import { Router } from '@angular/router';
import { ToastController, NavController} from '@ionic/angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoaderService } from 'src/app/services/loader.service';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Tarjeta } from 'src/app/models/tarjeta.model';


@Component({
  selector: 'app-tab-edit',
  templateUrl: './tab-edit.page.html',
  styleUrls: ['./tab-edit.page.scss'],
})
export class TabEditPage implements OnInit {

  editarForm: FormGroup;
  objectId: String;
  logoBase64: String;
  fotoBase64: String;
  options: any;
  miTarjeta: Tarjeta;
  objetoTarjeta: any;
  tagArray: string[] = [];

  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private formBuilder: FormBuilder,
    private loadingService: LoaderService,
    private imagePicker: ImagePicker,
    public navCtrl: NavController
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
                    linkedin: [
                      '',
                      [Validators.pattern(pattern)]
                    ],
                    privada: false,
                    tagValue: []
                });
                  const t = Parse.User.current().get('mi_tarjeta');
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
                    instagram: t.get('instagram'),
                    linkedin: t.get('Linkedin')
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
                  this.editarForm.get('linkedin').setValue(this.miTarjeta.linkedin);
                  this.editarForm.get('privada').setValue(this.miTarjeta.privade);
                  this.tagArray = (!this.miTarjeta.tags ? [] : this.miTarjeta.tags);
}

    remove(id: number): void {
      this.tagArray.splice(id, 1);
    }
    onKey(event: any) {
      if (event.keyCode === 13 || event.keyCode === 188 || event.keyCode === 32) {
        const newTag: string = event.target.value.trim().replace(/,/g, '');

        if (this.tagArray.indexOf(newTag) === -1) {
          this.tagArray.push(newTag);
        } else {
          this.presentToast('Tag repetido');
        }
        this.editarForm.get('tagValue').setValue('');
      }
    }
  async onSubmit() {

    this.loadingService.presentLoading();
              Parse.User.current().get('mi_tarjeta').set('Empresa', this.editarForm.value.empresa);
              Parse.User.current().get('mi_tarjeta').set('Nombre', this.editarForm.value.nombre);
              Parse.User.current().get('mi_tarjeta').set('Privada', this.editarForm.value.privada);
              Parse.User.current().get('mi_tarjeta').set('Direccion', this.editarForm.value.direccion);
              Parse.User.current().get('mi_tarjeta').set('Telefono', this.editarForm.value.telefono);
              Parse.User.current().get('mi_tarjeta').set('Email', this.editarForm.value.correo);
              Parse.User.current().get('mi_tarjeta').set('Cargo', this.editarForm.value.cargo);
              Parse.User.current().get('mi_tarjeta').set('Twit', this.editarForm.value.twit);
              Parse.User.current().get('mi_tarjeta').set('facebook', this.editarForm.value.facebook);
              Parse.User.current().get('mi_tarjeta').set('instagram', this.editarForm.value.instagram);
              Parse.User.current().get('mi_tarjeta').set('www', this.editarForm.value.web);
              Parse.User.current().get('mi_tarjeta').set('Linkedin', this.editarForm.value.linkedin);
              Parse.User.current().get('mi_tarjeta').set('tags', this.tagArray);
              await Parse.User.current().get('mi_tarjeta').save();
      this.loadingService.dissminsLoading();
      await this.presentToast('Información guardada');
  }

  logOut() {
    Parse.User.logOut().then((resp) => {
      console.log('Logged out successfully', resp);
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

  getLogo() {

    this.options = {
      // Android only. Max images to be selected, defaults to 15. If this is set to 1, upon
      // selection of a single image, the plugin will return it.
       maximumImagesCount: 1,
      // max width and height to allow the images to be.  Will keep aspect
      // ratio no matter what.  So if both are 800, the returned image
      // will be at most 800 pixels wide and 800 pixels tall.  If the width is
      // 800 and height 0 the image will be 800 pixels wide if the source
      // is at least that wide.
      width: 400,
      height: 400,
      // quality of resized image, defaults to 100
      quality: 100,

      // output type, defaults to FILE_URIs.
      // available options are
      // window.imagePicker.OutputType.FILE_URI (0) or
      // window.imagePicker.OutputType.BASE64_STRING (1)
      outputType: 1
    };
    this.loadingService.presentLoading();
    this.imagePicker.getPictures(this.options).then(async (results) => {
      for (let i = 0; i < results.length; i++) {
        this.miTarjeta.logo = ('data:image/jpeg;base64,' + results[i]);
        this.logoBase64 = results[i];
      }
      const file = new Parse.File('logo.jpg', { base64: this.logoBase64 });
      await file.save();
      Parse.User.current().get('mi_tarjeta').set('LogoEmpresa', file);
      await Parse.User.current().get('mi_tarjeta').save().then(function(gameTurnAgain) {
        this.presentToast('Logo actualizado');
        this.loadingService.dissminsLoading();
        }, function(error) {
          console.log(error);
          this.loadingService.dissminsLoading();
        });
      }, (err) => {console.log(err); });
  }

  getFoto() {

    this.options = {
      // Android only. Max images to be selected, defaults to 15. If this is set to 1, upon
      // selection of a single image, the plugin will return it.
       maximumImagesCount: 1,
      // max width and height to allow the images to be.  Will keep aspect
      // ratio no matter what.  So if both are 800, the returned image
      // will be at most 800 pixels wide and 800 pixels tall.  If the width is
      // 800 and height 0 the image will be 800 pixels wide if the source
      // is at least that wide.
      width: 600,
      height: 400,
      // quality of resized image, defaults to 100
      quality: 100,

      // output type, defaults to FILE_URIs.
      // available options are
      // window.imagePicker.OutputType.FILE_URI (0) or
      // window.imagePicker.OutputType.BASE64_STRING (1)
      outputType: 1
    };
    this.loadingService.presentLoading();
    this.imagePicker.getPictures(this.options).then(async (results) => {
      for (let i = 0; i < results.length; i++) {
        this.fotoBase64 =  results[i];
        this.miTarjeta.foto = ('data:image/jpeg;base64,' + results[i]);
      }
      const file = new Parse.File('logo.jpg', { base64: this.fotoBase64 });
      await file.save();
      Parse.User.current().get('mi_tarjeta').set('Foto', file);
      await Parse.User.current().get('mi_tarjeta').save().then(function(gameTurnAgain) {
        console.log('Se actualizo la Foto');
        this.presentToast('Foto actualizada');
        this.loadingService.dissminsLoading();
        }, function(error) {
          console.log(error);
          this.loadingService.dissminsLoading();
        });
      }, (err) => {console.log(err); });

  }

  goMap() {
    this.router.navigateByUrl('/home/tabs/edit/maps');
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
