import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'home', loadChildren: './pages/tabs/tabs.module#TabsPageModule' },
  { path: 'singup', loadChildren: './singup/singup.module#SingupPageModule' },
  { path: 'mycard', loadChildren: './mycard/mycard.module#MycardPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
