import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabSearchPage } from './tab-search.page';

const routes: Routes = [
  {
    path: '',
    component: TabSearchPage,
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
export class TabSearchPageRoutingModule {}
