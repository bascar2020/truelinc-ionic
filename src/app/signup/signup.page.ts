import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { Parse } from 'parse';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoaderService } from '../services/loader.service';
import { Storage } from '@ionic/storage';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  validations_form: FormGroup;
  constructor(
    private router: Router,
    private toast: ToastService,
    private formBuilder: FormBuilder,
    private loadingService: LoaderService,
    private storage: Storage,
    private barcodeScanner: BarcodeScanner,
    private file: File
  ) {

  }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      empresa : ['', [ Validators.required, Validators.minLength(4)]],
      cargo: ['', [ Validators.required, Validators.minLength(2)]],
      nombre: ['', [ Validators.required, Validators.minLength(2)]],
      telefono: ['', [ Validators.required, Validators.pattern('^[0-9]*$')]],
      direccion: ['', [ Validators.required]],
      correo: ['', [ Validators.required, Validators.email]],
      password: ['', [ Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&.,|¿]).{8,20}$')]],
    });
  }

   signUp() {
    this.loadingService.presentLoading();
    Parse.User.signUp(this.validations_form.value.correo, this.validations_form.value.password)
        .then(async (resp) => {
            // console.log('Logged in successfully', resp);
            const Tarjetas = Parse.Object.extend('Tarjetas');
            const tarjetaUser = new Tarjetas();
            tarjetaUser.set('Empresa', this.validations_form.value.empresa);
            tarjetaUser.set('Nombre', this.validations_form.value.nombre);
            tarjetaUser.set('generalRate', 5);
            tarjetaUser.set('Privada', false);
            tarjetaUser.set('Direccion', this.validations_form.value.direccion);
            tarjetaUser.set('Telefono', this.validations_form.value.telefono);
            tarjetaUser.set('Email', this.validations_form.value.correo);
            tarjetaUser.set('Cargo', this.validations_form.value.cargo);
            await tarjetaUser.save();
            resp.set('mi_tarjeta', tarjetaUser);
            resp.set('email', this.validations_form.value.correo);
            resp.set('tarjetas', [tarjetaUser.id]);
            await resp.save();
            // Clears up the form
            await this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, `truelinc + : + ${tarjetaUser.id}`)
            .then((encodedData) => {
                const nameFile: string = encodedData['file'].split('/').pop();
                this.file.readAsDataURL(this.file.tempDirectory, nameFile)
                .then(base64File => {
                  tarjetaUser.set('QR', new Parse.File(`${resp.id}.jpg`, { base64: base64File }));
                  tarjetaUser.save();
                })
                .catch(() => {
                    console.log('Error reading file');
                });
            }, (err) => {}
            );
            this.toast.presentToast('successfully');
            this.storage.set('currentUser', resp.toJSON());
            this.router.navigateByUrl('/home');
            this.loadingService.dissminsLoading();
        }, err => {
            console.log('Error signing in', err);
            this.toast.presentErrorToast('Error signing in' + err.message);
            this.loadingService.dissminsLoading();
        });
      this.loadingService.dissminsLoading();
  }
  onSubmit() {
   // console.log(this.validations_form.value);
    this.signUp();
    // TODO get form group value & handle submission
  }

  get empresa() {
    return this.validations_form.get('empresa');
  }
  get cargo() {
    return this.validations_form.get('cargo');
  }
  get nombre() {
    return this.validations_form.get('nombre');
  }
  get telefono() {
    return this.validations_form.get('telefono');
  }
  get direccion() {
    return this.validations_form.get('direccion');
  }
  get correo() {
    return this.validations_form.get('correo');
  }
  get password() {
    return this.validations_form.get('password');
  }


}
