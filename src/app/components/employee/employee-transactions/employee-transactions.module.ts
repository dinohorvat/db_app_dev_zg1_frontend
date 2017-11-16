import {NgModule} from "@angular/core";
import {EmployeeTransactionsRoutingModule} from "./employee-transactions-routing.module";
import {EmployeeTransactionsComponent} from "./employee-transactions.component";
import {CommonModule} from "@angular/common";
import {ModalModule, Ng2BootstrapModule} from "ng2-bootstrap";
import {FormsModule} from "@angular/forms";
import {CalendarModule} from 'primeng/primeng';
/**
 * Created by HrvojeGrgic on 14/11/2017.
 */


@NgModule({
    imports: [
        EmployeeTransactionsRoutingModule,
        CommonModule,
        Ng2BootstrapModule,
        ModalModule.forRoot(),
        FormsModule,
        CalendarModule,
    ],
    declarations: [ EmployeeTransactionsComponent ]
})
export class EmployeeTransactionsModule { }