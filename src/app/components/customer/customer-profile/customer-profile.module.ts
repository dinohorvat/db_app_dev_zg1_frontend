/**
 * Created by dinohorvat on 24/10/2017.
 */

import { NgModule } from '@angular/core';
import {UserProfileRoutingModule} from "./customer-profile-routing.module";
import {CustomerProfileComponent} from "./customer-profile.component";
import {CommonModule} from "@angular/common";
import {ModalModule, Ng2BootstrapModule} from "ng2-bootstrap";
import {FormsModule} from "@angular/forms";


@NgModule({
    imports: [
        UserProfileRoutingModule,
        CommonModule,
        Ng2BootstrapModule,
        ModalModule.forRoot(),
        FormsModule
    ],
    declarations: [ CustomerProfileComponent ]
})
export class UserProfileModule { }
