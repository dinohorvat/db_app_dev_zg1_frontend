/**
 * Created by dinohorvat on 19/11/2017.
 */
import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ManagerCustomerComponent} from "./manager-customer.component";

const routes: Routes = [
    {
        path: '',
        component: ManagerCustomerComponent,
        data: {
            title: 'Customer'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManagerCustomerRoutingModule {}