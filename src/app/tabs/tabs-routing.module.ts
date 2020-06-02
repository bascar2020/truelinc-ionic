import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'edit',
        loadChildren: () => import('../tab-edit/tab-edit.module').then(m => m.TabEditPageModule)
      },
      {
        path: 'search',
        loadChildren: () => import('../tab-search/tab-search.module').then(m => m.TabSearchPageModule)
      },
      {
        path: 'tarjetas',
        loadChildren: () => import('../tab-tarjetas/tab-tarjetas.module').then(m => m.TabTarjetasPageModule)
      },
      {
        path: '',
        redirectTo: '/home/tabs/tarjetas',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/home/tabs/tarjetas',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
