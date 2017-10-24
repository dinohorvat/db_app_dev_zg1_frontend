/**
 * Created by dinohorvat on 24/10/2017.
 */

import { NgModule } from '@angular/core';
import {ServiceInfoRoutingModule} from "./service-info-routing.module";
import {ServiceInfoComponent} from "./service-info.component";


@NgModule({
    imports: [
        ServiceInfoRoutingModule,
    ],
    declarations: [ ServiceInfoComponent ]
})
export class ServiceInfoModule { }
