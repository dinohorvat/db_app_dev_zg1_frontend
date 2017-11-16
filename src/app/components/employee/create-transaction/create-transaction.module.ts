import {CreateTransactionRoutingModule} from "./create-transaction-routing.module";
import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {ModalModule, Ng2BootstrapModule} from "ng2-bootstrap";
import {FormsModule} from "@angular/forms";
import {CreateTransactionComponent} from "./create-transaction.component";
import {FormWizardModule} from "angular2-wizard/dist";
/**
 * Created by HrvojeGrgic on 16/11/2017.
 */
@NgModule({
    imports: [
        CreateTransactionRoutingModule,
        CommonModule,
        Ng2BootstrapModule,
        ModalModule.forRoot(),
        FormsModule,
        FormWizardModule
    ],
    declarations: [ CreateTransactionComponent ]
})
export class CreateTransactionModule {}