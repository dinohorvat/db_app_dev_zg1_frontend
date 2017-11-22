/**
 * Created by dinohorvat on 19/11/2017.
 */
import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ManagerBranchComponent} from "./manager-branch.component";
import {ManagerEmployeeComponent} from "./manager-employee/manager-employee.component";
import {ManagerTransactionsComponent} from "./manager-transactions/manager-transactions.component";

const routes: Routes = [
    {
        path: '',
        component: ManagerBranchComponent,
        data: {
            title: 'Branch'
        },
        children: [
            {
                path: 'employees',
                component: ManagerEmployeeComponent,
                data: {
                    title: 'Employees'
                }
            },
            {
                path: 'transactions',
                component: ManagerTransactionsComponent,
                data: {
                    title: 'Transactions'
                }
            }]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManagerBranchRoutingModule {}