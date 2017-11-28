import {ManagerBranchHistoryComponent} from "./manager-branch-history.component";
import {ManagerBranchHistoryRoutingModule} from "./manager-branch-history-routing.module";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ModalModule, Ng2BootstrapModule} from "ng2-bootstrap";
import {FormsModule} from "@angular/forms";
/**
 * Created by HrvojeGrgic on 28/11/2017.
 */
@NgModule({
    imports: [
        CommonModule,
        ManagerBranchHistoryRoutingModule,
        Ng2BootstrapModule,
        ModalModule.forRoot(),
        FormsModule
    ],
    declarations: [ ManagerBranchHistoryComponent ]
})
export class ManagerCustomerModule {}