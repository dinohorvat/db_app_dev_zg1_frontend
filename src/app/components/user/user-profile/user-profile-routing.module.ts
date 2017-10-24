/**
 * Created by dinohorvat on 24/10/2017.
 */
import { NgModule } from '@angular/core';
import { Routes,
    RouterModule } from '@angular/router';
import {UserProfileComponent} from "./user-profile.component";


const routes: Routes = [
    {
        path: '',
        component: UserProfileComponent,
        data: {
            title: 'UserProfile'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserProfileRoutingModule {}
