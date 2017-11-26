import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {LocationStrategy, PathLocationStrategy} from '@angular/common';

import { AppComponent } from './app.component';
import { BsDropdownModule } from 'ng2-bootstrap/dropdown';
import { TabsModule } from 'ng2-bootstrap/tabs';
import { NAV_DROPDOWN_DIRECTIVES } from './components/shared/nav-dropdown.directive';

import { ChartsModule } from 'ng2-charts/ng2-charts';
import { SIDEBAR_TOGGLE_DIRECTIVES } from './components/shared/sidebar.directive';
import { AsideToggleDirective } from './components/shared/aside.directive';
import { BreadcrumbsComponent } from './components/shared/breadcrumb.component';

// Routing Module
import { AppRoutingModule } from './app.routing';

//Layouts
import { FullLayoutComponent } from './components/layouts/full-layout.component';
import {Ng2Permission, PermissionGuard, PermissionService} from "angular2-permission";
import {GlobalService} from "./services/global.service";
import {BranchService} from "./services/assets/branch.service";
import {CompanyService} from "./services/assets/company.service";
import {CurrencyService} from "./services/assets/currency.service";
import {CustomerService} from "./services/assets/customer.service";
import {EmployeeService} from "./services/assets/employee.service";
import {LocationService} from "./services/assets/location.service";
import {ProductService} from "./services/assets/product.service";
import {TransactionsService} from "./services/assets/transactions.service";
import {HttpModule} from "@angular/http";
import { ErrorPageComponent } from './components/error-page/error-page.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {KeyCloakService} from "./services/keycloak/keycloak.service";
import { LoginScreenComponent } from './components/login/login-screen/login-screen.component';
import { LogoutScreenComponent } from './components/login/logout-screen/logout-screen.component';
import {ToasterModule, ToasterService} from "angular2-toaster";
import {ConfirmationService, ConfirmDialogModule} from "primeng/primeng";

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    Ng2Permission,
    HttpModule,
    ToasterModule,
    ConfirmDialogModule
  ],
  declarations: [
    AppComponent,
    FullLayoutComponent,
    NAV_DROPDOWN_DIRECTIVES,
    BreadcrumbsComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective,
    ErrorPageComponent,
    LoginScreenComponent,
    LogoutScreenComponent,
  ],
  providers: [
      GlobalService,
      BranchService,
      CompanyService,
      CurrencyService,
      CustomerService,
      EmployeeService,
      LocationService,
      ProductService,
      TransactionsService,
      KeyCloakService,
      ToasterService,
      PermissionGuard,
      PermissionService,
      ConfirmationService,
      {
    provide: LocationStrategy,
    useClass: PathLocationStrategy
  }],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
