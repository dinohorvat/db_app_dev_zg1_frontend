import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Layouts
import { FullLayoutComponent } from './components/layouts/full-layout.component';
import {ErrorPageComponent} from "./components/error-page/error-page.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  { path: 'error', component: ErrorPageComponent},
  {
    path: '',
    component: FullLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'service-info',
        loadChildren: './components/customer/service-info/service-info.module#ServiceInfoModule'
      },
      {
        path: 'customer-profile',
        loadChildren: './components/customer/customer-profile/customer-profile.module#UserProfileModule'
      },
      {
        path: 'rewards',
        loadChildren: './components/customer/rewards/rewards.module#RewardsModule'
      },
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
