/**
 * Created by dinohorvat on 19/11/2017.
 */
import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ManagerCompanyComponent} from "./manager-company.component";

const routes: Routes = [
    {
        path: '',
        component: ManagerCompanyComponent,
        data: {
            title: 'Company'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManagerCompanyRoutingModule {}