import {EmployeeProfileComponent} from "./employee-profile.component";
import {FormsModule} from "@angular/forms";
import {NgModule, OnInit} from "@angular/core";
import {EmployeeProfileRoutingModule} from "./employee-profile-routing.module";
import {CommonModule} from "@angular/common";
import {ModalModule, Ng2BootstrapModule} from "ng2-bootstrap";
import {EmployeeModel} from "../../../model/employee.model";
import {EmployeeService} from "../../../services/assets/employee.service";

/**
 * Created by HrvojeGrgic on 15/11/2017.
 */


@NgModule({
    imports: [
        EmployeeProfileRoutingModule,
        CommonModule,
        Ng2BootstrapModule,
        ModalModule.forRoot(),
        FormsModule
    ],
    declarations: [ EmployeeProfileComponent ]
})
export class EmployeeProfileModule {}