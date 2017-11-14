
/**
 * Created by dinohorvat on 24/10/2017.
 */
import { NgModule } from '@angular/core';
import { Routes,
    RouterModule } from '@angular/router';
import {ServiceInfoComponent} from "./service-info.component";


const routes: Routes = [
    {
        path: '',
        component: ServiceInfoComponent,
        data: {
            title: 'ServiceInfo'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ServiceInfoRoutingModule {}
