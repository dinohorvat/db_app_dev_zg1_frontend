/**
 * Created by dinohorvat on 19/11/2017.
 */
import {FormsModule} from "@angular/forms";
import {NgModule, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ModalModule, Ng2BootstrapModule} from "ng2-bootstrap";
import {ManagerCompanyRoutingModule} from "./manager-company-routing.module";
import {ManagerCompanyComponent} from "./manager-company.component";

@NgModule({
    imports: [
        ManagerCompanyRoutingModule,
        CommonModule,
        Ng2BootstrapModule,
        ModalModule.forRoot(),
        FormsModule
    ],
    declarations: [ ManagerCompanyComponent ]
})
export class ManagerCompanyModule {}