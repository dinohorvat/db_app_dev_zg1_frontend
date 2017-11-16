/**
 * Created by dinohorvat on 16/11/2017.
 */
import {FormsModule} from "@angular/forms";
import {NgModule, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ModalModule, Ng2BootstrapModule} from "ng2-bootstrap";
import {HomeRoutingModule} from "./home-routing.module";
import {HomeComponent} from "./home.component";

@NgModule({
    imports: [
        HomeRoutingModule,
        CommonModule,
        Ng2BootstrapModule,
        ModalModule.forRoot(),
        FormsModule
    ],
    declarations: [ HomeComponent ]
})
export class HomeModule {}