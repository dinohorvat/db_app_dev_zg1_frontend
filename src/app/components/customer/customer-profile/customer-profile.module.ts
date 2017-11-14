/**
 * Created by dinohorvat on 24/10/2017.
 */

import { NgModule } from '@angular/core';
import {UserProfileRoutingModule} from "./customer-profile-routing.module";
import {CustomerProfileComponent} from "./customer-profile.component";


@NgModule({
    imports: [
        UserProfileRoutingModule,
    ],
    declarations: [ CustomerProfileComponent ]
})
export class UserProfileModule { }
