import {ManagerProductRoutingModule} from "./manager-product-routing.module";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ModalModule, Ng2BootstrapModule} from "ng2-bootstrap";
import {FormsModule} from "@angular/forms";
import {ManagerProductComponent} from "./manager-product.component";
/**
 * Created by HrvojeGrgic on 26/11/2017.
 */

@NgModule({
    imports: [
        ManagerProductRoutingModule,
        CommonModule,
        Ng2BootstrapModule,
        ModalModule.forRoot(),
        FormsModule
    ],
    declarations: [ ManagerProductComponent ]
})
export class ManagerProductModule {}