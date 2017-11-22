/**
 * Created by dinohorvat on 19/11/2017.
 */
import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ManagerTransactionsComponent} from "./manager-transactions.component";

const routes: Routes = [
    {
        path: '',
        component: ManagerTransactionsComponent,
        data: {
            title: 'Transactions'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManagerTransactionsRoutingModule {}