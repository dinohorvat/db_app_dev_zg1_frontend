/**
 * Created by dinohorvat on 19/11/2017.
 */
import {FormsModule} from "@angular/forms";
import {NgModule, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ModalModule, Ng2BootstrapModule} from "ng2-bootstrap";
import {ManagerEmployeeRoutingModule} from "./manager-employee-routing.module";
import {ManagerEmployeeComponent} from "./manager-employee.component";

@NgModule({
    imports: [
        ManagerEmployeeRoutingModule,
        CommonModule,
        Ng2BootstrapModule,
        ModalModule.forRoot(),
        FormsModule
    ],
    declarations: [ ManagerEmployeeComponent ]
})
export class ManagerEmployeeModule {}