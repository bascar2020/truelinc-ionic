import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabTarjetasPage } from './tab-tarjetas.page';

const routes: Routes = [
  {
    path: '',
    component: TabTarjetasPage,
  },
  {
    path: ':id',
    loadChildren: () => import('../mycard/mycard.module').then(m => m.MycardPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabTarjetasPageRoutingModule {}
