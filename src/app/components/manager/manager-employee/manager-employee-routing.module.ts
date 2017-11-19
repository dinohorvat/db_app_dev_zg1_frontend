/**
 * Created by dinohorvat on 19/11/2017.
 */
import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ManagerEmployeeComponent} from "./manager-employee.component";

const routes: Routes = [
    {
        path: '',
        component: ManagerEmployeeComponent,
        data: {
            title: 'Employee'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManagerEmployeeRoutingModule {}