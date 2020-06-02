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

  public validationsForm: FormGroup;
  public createCard: boolean;
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
    this.validationsForm = this.formBuilder.group({
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
    Parse.User.signUp(this.validationsForm.value.correo, this.validationsForm.value.password)
        .then(async (resp) => {
            // console.log('Logged in successfully', resp);
            const Tarjetas = Parse.Object.extend('Tarjetas');
            const tarjetaUser = new Tarjetas();
            tarjetaUser.set('Email', this.validationsForm.value.correo);
            tarjetaUser.set('Empresa', this.validationsForm.value.empresa || null);
            tarjetaUser.set('Nombre', this.validationsForm.value.nombre);
            tarjetaUser.set('Direccion', this.validationsForm.value.direccion || null);
            tarjetaUser.set('Telefono', this.validationsForm.value.telefono || null);
            tarjetaUser.set('Cargo', this.validationsForm.value.cargo || null);
            tarjetaUser.set('generalRate', 5);
            tarjetaUser.set('Privada', true);
            await tarjetaUser.save();
            resp.set('mi_tarjeta', tarjetaUser);
            resp.set('email', this.validationsForm.value.correo);
            resp.set('tarjetas', [tarjetaUser.id]);
            await resp.save();
            // Clears up the form
            await this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, `truelinc + : + ${tarjetaUser.id}`)
            .then((encodedData) => {
                const nameFile: string = encodedData.file.split('/').pop();
                this.file.readAsDataURL(this.file.tempDirectory, nameFile)
                .then(base64File => {
                  tarjetaUser.set('QR', new Parse.File(`${resp.id}.jpg`, { base64: base64File }));
                  tarjetaUser.save();
                })
                .catch(() => {
                    console.error('Error reading file');
                });
            }, (err) => {}
            );
            this.toast.presentToast('successfully');
            this.storage.set('currentUser', resp.toJSON());
            this.router.navigateByUrl('/home');
            this.loadingService.dissminsLoading();
        }, err => {
            console.error('Error signing in', err);
            this.toast.presentErrorToast('Error signing in' + err.message);
            this.loadingService.dissminsLoading();
        });
    this.loadingService.dissminsLoading();
  }
  onSubmit() {
   // console.log(this.validationsForm.value);
    this.signUp();
    // TODO get form group value & handle submission
  }

  get empresa() {
    return this.validationsForm.get('empresa');
  }
  get cargo() {
    return this.validationsForm.get('cargo');
  }
  get nombre() {
    return this.validationsForm.get('nombre');
  }
  get telefono() {
    return this.validationsForm.get('telefono');
  }
  get direccion() {
    return this.validationsForm.get('direccion');
  }
  get correo() {
    return this.validationsForm.get('correo');
  }
  get password() {
    return this.validationsForm.get('password');
  }


}
