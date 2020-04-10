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

  public validations_form: FormGroup;
  public createCard: Boolean;
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
    this.createCard = false;
    this.validations_form = this.formBuilder.group({
      nombre: ['', [ Validators.required, Validators.minLength(2)]],
      correo: ['', [ Validators.required, Validators.email]],
      password: ['', [ Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&.,|¿]).{8,20}$')]],
      empresa : ['', []],
      cargo: ['', []],
      telefono: ['', []],
      direccion: ['', []],
    });
  }

  changeToogle($event) {
    this.createCard = !this.createCard;
    if (this.createCard) {
      this.empresa.setValidators([ Validators.required, Validators.minLength(4)]);
      this.empresa.updateValueAndValidity();
      this.cargo.setValidators([ Validators.required, Validators.minLength(2)]);
      this.cargo.updateValueAndValidity();
      this.telefono.setValidators([ Validators.required, Validators.pattern('^[0-9]*$')]);
      this.telefono.updateValueAndValidity();
      this.direccion.setValidators([ Validators.required]);
      this.direccion.updateValueAndValidity();
    } else {
      this.empresa.clearValidators();
      this.empresa.updateValueAndValidity();
      this.cargo.clearValidators();
      this.cargo.updateValueAndValidity();
      this.telefono.clearValidators();
      this.telefono.updateValueAndValidity();
      this.direccion.clearValidators();
      this.direccion.updateValueAndValidity();
    }

  }

   signUp() {
    this.loadingService.presentLoading();
    Parse.User.signUp(this.validations_form.value.correo, this.validations_form.value.password)
        .then(async (resp) => {
            // console.log('Logged in successfully', resp);
            const Tarjetas = Parse.Object.extend('Tarjetas');
            const tarjetaUser = new Tarjetas();
            tarjetaUser.set('Email', this.validations_form.value.correo);
            tarjetaUser.set('Empresa', this.validations_form.value.empresa || null);
            tarjetaUser.set('Nombre', this.validations_form.value.nombre);
            tarjetaUser.set('Direccion', this.validations_form.value.direccion || null);
            tarjetaUser.set('Telefono', this.validations_form.value.telefono || null);
            tarjetaUser.set('Cargo', this.validations_form.value.cargo || null);
            tarjetaUser.set('generalRate', 5);
            tarjetaUser.set('Privada', true);
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
