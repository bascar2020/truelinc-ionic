import { Component, OnInit } from '@angular/core';
import { Parse } from 'parse';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-tab-edit',
  templateUrl: './tab-edit.page.html',
  styleUrls: ['./tab-edit.page.scss'],
})
export class TabEditPage implements OnInit {

  editarForm: FormGroup;
  objectId: String;
  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private storage: Storage,
    private formBuilder: FormBuilder,
    private loadingService: LoaderService,
  ) { }

ngOnInit() {
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
                        [Validators.pattern('https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)')]
                    ],
                    instagram: [
                        '',
                        [Validators.pattern('https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)')]
                    ],
                    web: [
                        '',
                        [Validators.pattern('https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)')]
                    ],
                    privada: false
                });

    this.storage
        .get('currentUser')
        .then((val) => {
          this.editarForm.get('empresa').setValue(val.mi_tarjeta.Empresa);
          this.editarForm.get('nombre').setValue(val.mi_tarjeta.Nombre);
          this.editarForm.get('cargo').setValue(val.mi_tarjeta.Cargo);
          this.editarForm.get('twit').setValue(val.mi_tarjeta.Twit);
          this.editarForm.get('telefono').setValue(val.mi_tarjeta.Telefono);
          this.editarForm.get('direccion').setValue(val.mi_tarjeta.Direccion);
          this.editarForm.get('correo').setValue(val.mi_tarjeta.Email);
          this.editarForm.get('facebook').setValue(val.mi_tarjeta.facebook);
          this.editarForm.get('instagram').setValue(val.mi_tarjeta.instagram);
          this.editarForm.get('web').setValue(val.mi_tarjeta.www);
          this.editarForm.get('privada').setValue(val.mi_tarjeta.Privada);
          this.objectId = val.mi_tarjeta.objectId;
        }, (error) => {
            console.error(error);
        });
}
  async onSubmit() {
    console.log(this.editarForm.value);
    this.loadingService.presentLoading();
    const Tarjetas = Parse.Object.extend('Tarjetas');
            const tarjetaUser = new Tarjetas();
            tarjetaUser.set('objectId', this.objectId);
            tarjetaUser.set('Empresa', this.editarForm.value.empresa);
            tarjetaUser.set('Nombre', this.editarForm.value.nombre);
            tarjetaUser.set('Privada', this.editarForm.value.privada);
            tarjetaUser.set('Direccion', this.editarForm.value.direccion);
            tarjetaUser.set('Telefono', this.editarForm.value.telefono);
            tarjetaUser.set('Email', this.editarForm.value.correo);
            tarjetaUser.set('Cargo', this.editarForm.value.cargo);
            tarjetaUser.set('Twit', this.editarForm.value.twit);
            tarjetaUser.set('facebook', this.editarForm.value.facebook);
            tarjetaUser.set('instagram', this.editarForm.value.instagram);
            tarjetaUser.set('www', this.editarForm.value.web);
            await tarjetaUser.update();
      this.loadingService.dissminsLoading();
  }

  logOut() {
    Parse.User.logOut().then((resp) => {
      console.log('Logged out successfully', resp);
      this.router.navigateByUrl('/');
      this.storage.set('currentUser', null);
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
