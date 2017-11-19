import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Layouts
import { FullLayoutComponent } from './components/layouts/full-layout.component';
import {ErrorPageComponent} from "./components/error-page/error-page.component";
import {LoginScreenComponent} from "./components/login/login-screen/login-screen.component";
import {LogoutScreenComponent} from "./components/login/logout-screen/logout-screen.component";
import {HomeComponent} from "./components/home/home.component";
import {PermissionGuard, IPermissionGuardModel} from "angular2-permission";

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginScreenComponent},
  { path: 'logout', component: LogoutScreenComponent},
  { path: 'error', component: ErrorPageComponent},
  {
    path: '',
    component: FullLayoutComponent,
    data: {
      title: 'DCS',
      Permission: {
        Except: ['customer'],
        RedirectTo: '403'
      } as IPermissionGuardModel
    },
    canActivate: [PermissionGuard],


    children: [
      {
        path: 'service-info',
        loadChildren: './components/customer/service-info/service-info.module#ServiceInfoModule',
        canActivate: [PermissionGuard],
        data: {
          Permission: {
            Except: ['customer'],
            RedirectTo: 'error'
          } as IPermissionGuardModel
        },
      },
      {
        path: 'home',
        loadChildren: './components/home/home.module#HomeModule'
      },
      {
        path: 'customer-profile',
        loadChildren: './components/customer/customer-profile/customer-profile.module#UserProfileModule'
      },
      {
        path: 'rewards',
        loadChildren: './components/customer/rewards/rewards.module#RewardsModule'
      },
      {
        path: 'employee-transactions',
        loadChildren: './components/employee/employee-transactions/employee-transactions.module#EmployeeTransactionsModule',
      },
      {
        path: 'employee-profile',
        loadChildren: './components/employee/employee-profile/employee-profile.module#EmployeeProfileModule'
      },
      {
        path: 'create-transaction',
        loadChildren: './components/employee/create-transaction/create-transaction.module#CreateTransactionModule'
      },
      {
        path: 'manager-company',
        loadChildren: './components/manager/manager-company/manager-company.module#ManagerCompanyModule'
      },
      {
        path: 'manager-branch',
        loadChildren: './components/manager/manager-branch/manager-branch.module#ManagerBranchModule'
      },
      {
        path: 'manager-transactions',
        loadChildren: './components/manager/manager-transactions/manager-transactions.module#ManagerTransactionsModule'
      },
      {
        path: 'manager-employee',
        loadChildren: './components/manager/manager-employee/manager-employee.module#ManagerEmployeeModule'
      },
      {
        path: 'manager-customer',
        loadChildren: './components/manager/manager-customer/manager-customer.module#ManagerCustomerModule'
      },


    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
