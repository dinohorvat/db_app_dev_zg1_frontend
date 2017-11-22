/**
 * Created by dinohorvat on 19/11/2017.
 */
import {FormsModule} from "@angular/forms";
import {NgModule, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ModalModule, Ng2BootstrapModule} from "ng2-bootstrap";
import {ManagerCustomerRoutingModule} from "./manager-customer-routing.module";
import {ManagerCustomerComponent} from "./manager-customer.component";

@NgModule({
    imports: [
        ManagerCustomerRoutingModule,
        CommonModule,
        Ng2BootstrapModule,
        ModalModule.forRoot(),
        FormsModule
    ],
    declarations: [ ManagerCustomerComponent ]
})
export class ManagerCustomerModule {}