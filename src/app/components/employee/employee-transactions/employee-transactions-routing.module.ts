/**
 * Created by HrvojeGrgic on 14/11/2017.
 */

import { NgModule } from '@angular/core';
import { Routes,
    RouterModule } from '@angular/router';
import {EmployeeTransactionsComponent} from "./employee-transactions.component";


const routes: Routes = [
    {
        path: '',
        component: EmployeeTransactionsComponent,
        data: {
            title: 'Transactions'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EmployeeTransactionsRoutingModule {}

