/**
 * Created by dinohorvat on 24/10/2017.
 */
import { NgModule } from '@angular/core';
import { Routes,
    RouterModule } from '@angular/router';
import {CustomerProfileComponent} from "./customer-profile.component";


const routes: Routes = [
    {
        path: '',
        component: CustomerProfileComponent,
        data: {
            title: 'Customer Profile'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserProfileRoutingModule {}
