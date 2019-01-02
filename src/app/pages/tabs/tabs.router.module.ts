import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tarjetas',
        children: [
          {
            path: '',
            loadChildren: '../tab-tarjetas/tab-tarjetas.module#TabTarjetasPageModule'
          },
          {
            path: ':id',
            loadChildren: '../../mycard/mycard.module#MycardPageModule'
          }
        ]
      },
      {
        path: 'search',
        children: [
          {
            path: '',
            loadChildren: '../tab-search/tab-search.module#TabSearchPageModule'
          }
        ]
      },
      {
        path: 'camera',
        children: [
          {
            path: '',
            loadChildren: '../tab-camera/tab-camera.module#TabCameraPageModule'
          }
        ]
      },
      {
        path: 'edit',
        children: [
          {
            path: '',
            loadChildren: '../tab-edit/tab-edit.module#TabEditPageModule'
          }
        ]
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
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsRoutingModule { }
