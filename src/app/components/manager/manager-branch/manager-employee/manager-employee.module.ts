/**
 * Created by dinohorvat on 19/11/2017.
 */
import {FormsModule} from "@angular/forms";
import {NgModule, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ModalModule, Ng2BootstrapModule} from "ng2-bootstrap";
import {ManagerEmployeeComponent} from "./manager-employee.component";
import {EmployeeProfileComponent} from "../../../employee/employee-profile/employee-profile.component";

@NgModule({
    imports: [
        CommonModule,
        Ng2BootstrapModule,
        ModalModule.forRoot(),
        FormsModule
    ],
    declarations: [
        ManagerEmployeeComponent,
        EmployeeProfileComponent,
    ]
})
export class ManagerEmployeeModule {}