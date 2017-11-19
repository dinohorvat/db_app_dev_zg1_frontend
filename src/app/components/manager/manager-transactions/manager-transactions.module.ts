/**
 * Created by dinohorvat on 19/11/2017.
 */
import {FormsModule} from "@angular/forms";
import {NgModule, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ModalModule, Ng2BootstrapModule} from "ng2-bootstrap";
import {ManagerTransactionsComponent} from "./manager-transactions.component";
import {ManagerTransactionsRoutingModule} from "./manager-transactions-routing.module";

@NgModule({
    imports: [
        ManagerTransactionsRoutingModule,
        CommonModule,
        Ng2BootstrapModule,
        ModalModule.forRoot(),
        FormsModule
    ],
    declarations: [ ManagerTransactionsComponent ]
})
export class ManagerTransactionsModule {}