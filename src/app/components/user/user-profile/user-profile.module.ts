/**
 * Created by dinohorvat on 24/10/2017.
 */

import { NgModule } from '@angular/core';
import {UserProfileRoutingModule} from "./user-profile-routing.module";
import {UserProfileComponent} from "./user-profile.component";


@NgModule({
    imports: [
        UserProfileRoutingModule,
    ],
    declarations: [ UserProfileComponent ]
})
export class UserProfileModule { }
