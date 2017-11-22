/**
 * Created by dinohorvat on 24/10/2017.
 */
import { NgModule } from '@angular/core';
import { Routes,
    RouterModule } from '@angular/router';
import {RewardsComponent} from "./rewards.component";


const routes: Routes = [
    {
        path: '',
        component: RewardsComponent,
        data: {
            title: 'Customer Rewards'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RewardsRoutingModule {}
