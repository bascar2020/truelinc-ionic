import { Component, OnInit } from '@angular/core';
import { Parse } from 'parse';
import { Router } from '@angular/router';
import { ToastController, NavController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoaderService } from 'src/app/services/loader.service';
import { Tarjeta } from 'src/app/models/tarjeta.model';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { ActionSheetController } from '@ionic/angular';
import { Crop } from '@ionic-native/crop/ngx';
import { Plugins } from '@capacitor/core';

const { Filesystem } = Plugins;

enum IconType {
  Foto,
  Logo
}
@Component({
  selector: 'app-tab-edit',
  templateUrl: './tab-edit.page.html',
  styleUrls: ['./tab-edit.page.scss'],
})
export class TabEditPage implements OnInit {

  editarForm: FormGroup;
  objectId: string;
  logoBase64: string;
  fotoBase64: string;
  options: any;
  miTarjeta: Tarjeta;
  objetoTarjeta: any;
  tagArray: string[] = [];

  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private formBuilder: FormBuilder,
    private loadingService: LoaderService,
    public navCtrl: NavController,
    private camera: Camera,
    public actionSheetController: ActionSheetController,
    private file: File,
    private crop: Crop,
  ) { }

  ngOnInit() {
    const pattern = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    this.editarForm = this.formBuilder
      .group({
        empresa: ['', [Validators.required, Validators.minLength(4)]],
        nombre: ['', [Validators.required, Validators.minLength(2)]],
        cargo: ['', [Validators.required, Validators.minLength(2)]],
        twit: ['', [Validators.minLength(10)]],
        telefono: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
        direccion: ['', [Validators.required]],
        correo: ['', [Validators.required, Validators.email]],
        facebook: ['', [Validators.pattern(pattern)]],
        instagram: ['', [Validators.pattern(pattern)]],
        web: ['', [Validators.pattern(pattern)]],
        linkedin: ['', [Validators.pattern(pattern)]],
        privada: false,
        tagValue: []
      });
    const t = Parse.User.current().get('mi_tarjeta');
    this.miTarjeta = {
      id: t.id,
      nombre: t.get('Nombre'),
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
    const lastChart = event.target.value.slice(-1);
    if (event.keyCode === 13 || event.keyCode === 188 || event.keyCode === 32 ||  lastChart === ',' ||  lastChart === '.'||  lastChart === ' ') {
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
    Parse.User.current().get('mi_tarjeta').set('Telefono', '' + this.editarForm.value.telefono);
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
      console.error('Error logging out', err);
      this.presentToast('Error logging out');
    });
  }
  async presentToast(msj) {
    const toast = await this
      .toastCtrl
      .create({ message: msj, duration: 2000 });
    return await toast.present();
  }

  getLogo() {
    this.selectImage(IconType.Logo);
  }

  getFoto() {
    this.selectImage(IconType.Foto);
  }

  goMap() {
    this.router.navigateByUrl('/home/tabs/edit/maps');
  }

  async selectImage(iconType) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Fuente de imagen',
      buttons: [{
        text: 'Usar Galeria',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY, iconType);
        }
      },
      {
        text: 'Usar Camara',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.CAMERA, iconType);
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }

  pickImage(sourceType, iconType) {
    const options: CameraOptions = {
      quality: 100,
      sourceType,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(options).then(async (imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      const base64Image = 'data:image/jpeg;base64,' + imageData;
      this.cropImage(imageData, iconType);
      // this.updatePicture(base64Image, iconType);
    }, (err) => {
      console.error(err);
    });
  }

  cropImage(fileUrl, iconType) {
    this.crop.crop(fileUrl, { quality: 50, targetWidth: -1, targetHeight: -1 })
      .then(
        newPath => {
          this.showCroppedImage(newPath.split('?')[0], iconType);
        },
        error => {
          alert('Error cropping image' + error);
        }
      );
  }

  async showCroppedImage(ImagePath, iconType) {
    const copyPath = ImagePath;
    const splitPath = copyPath.split('/');
    const imageName = splitPath[splitPath.length - 1];
    const filePath = ImagePath.split(imageName)[0];
    const splitFile = imageName.split('.');
    const extencion = splitFile[splitFile.length - 1];
    const appendBase64 =  `data:image/${extencion};base64,`;
    await Filesystem.readFile({
        path: ImagePath
      }).then((FileResult) => {
       const finalBase64 = appendBase64 +  FileResult.data;
       this.updatePicture(finalBase64 , iconType);
      });

  }
  async updatePicture(base64, iconType ) {
      let nameVarBack4App = 'Foto';
      this.loadingService.presentLoading();
      let nameFile = '';
      if (IconType.Foto === iconType) {
        nameFile = 'Foto.jpg';
        this.miTarjeta.foto = base64;
      } else {
        nameFile = 'Logo.jpg';
        nameVarBack4App = 'LogoEmpresa';
        this.miTarjeta.logo = base64;
      }
      const file = new Parse.File(nameFile, { base64 });
      await file.save();
      Parse.User.current().get('mi_tarjeta').set(nameVarBack4App, file);
      await Parse.User.current().get('mi_tarjeta').save().then(() => {
      }, (error) => { console.error(error); });

      this.presentToast(nameFile.slice(0, nameFile.length - 4) + 'cargada.');
      this.loadingService.dissminsLoading();
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
