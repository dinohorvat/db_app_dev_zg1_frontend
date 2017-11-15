import {EmployeeProfileComponent} from "./employee-profile.component";
import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
/**
 * Created by HrvojeGrgic on 15/11/2017.
 */

const routes: Routes = [
    {
        path: '',
        component: EmployeeProfileComponent,
        data: {
            title: 'Employee Profile'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EmployeeProfileRoutingModule {}