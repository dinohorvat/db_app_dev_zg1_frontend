/**
 * Created by dinohorvat on 19/11/2017.
 */
import {FormsModule} from "@angular/forms";
import {NgModule, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ModalModule, Ng2BootstrapModule} from "ng2-bootstrap";
import {ManagerBranchRoutingModule} from "./manager-branch-routing.module";
import {ManagerBranchComponent} from "./manager-branch.component";
import {ManagerEmployeeComponent} from "./manager-employee/manager-employee.component";
import {EmployeeProfileComponent} from "../../employee/employee-profile/employee-profile.component";
import {ManagerTransactionsComponent} from "./manager-transactions/manager-transactions.component";
import {EmployeeTransactionsComponent} from "../../employee/employee-transactions/employee-transactions.component";
import { ManagerBranchHistoryComponent } from './manager-branch-history/manager-branch-history.component';

@NgModule({
    imports: [
        ManagerBranchRoutingModule,
        CommonModule,
        Ng2BootstrapModule,
        ModalModule.forRoot(),
        FormsModule
    ],
    declarations: [
        ManagerBranchComponent,
        ManagerEmployeeComponent,
        EmployeeProfileComponent,
        ManagerTransactionsComponent,
        EmployeeTransactionsComponent,
        ManagerBranchHistoryComponent
    ]
})
export class ManagerBranchModule {}