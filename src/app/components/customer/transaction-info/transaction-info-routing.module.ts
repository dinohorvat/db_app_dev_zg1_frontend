
/**
 * Created by dinohorvat on 24/10/2017.
 */
import { NgModule } from '@angular/core';
import { Routes,
    RouterModule } from '@angular/router';
import {TransactionInfoComponent} from "./transaction-info.component";


const routes: Routes = [
    {
        path: '',
        component: TransactionInfoComponent,
        data: {
            title: 'Transactions'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TransactionInfoRoutingModule {}
