/**
 * Created by dinohorvat on 24/10/2017.
 */
import { NgModule } from '@angular/core';
import {RewardsRoutingModule} from "./rewards-routing.module";
import {RewardsComponent} from "./rewards.component";


@NgModule({
    imports: [
        RewardsRoutingModule,
    ],
    declarations: [ RewardsComponent ]
})
export class RewardsModule { }
