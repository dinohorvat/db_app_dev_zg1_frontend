import {ManagerProductComponent} from "./manager-product.component";
import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
/**
 * Created by HrvojeGrgic on 26/11/2017.
 */

const routes: Routes = [
    {
        path: '',
        component: ManagerProductComponent,
        data: {
            title: 'Products'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManagerProductRoutingModule {}
