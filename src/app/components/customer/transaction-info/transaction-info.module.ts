/**
 * Created by dinohorvat on 24/10/2017.
 */

import { NgModule } from '@angular/core';
import {TransactionInfoRoutingModule} from "./transaction-info-routing.module";
import {TransactionInfoComponent} from "./transaction-info.component";
import {CommonModule} from "@angular/common";
import {ModalModule, Ng2BootstrapModule} from "ng2-bootstrap";
import {FormsModule} from "@angular/forms";


@NgModule({
    imports: [
        TransactionInfoRoutingModule,
        CommonModule,
        Ng2BootstrapModule,
        ModalModule.forRoot(),
        FormsModule
    ],
    declarations: [ TransactionInfoComponent ]
})
export class TransactionInfoModule { }
