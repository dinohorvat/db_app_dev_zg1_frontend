import {CreateTransactionComponent} from "./create-transaction.component";
import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
const routes: Routes = [
    {
        path: '',
        component: CreateTransactionComponent,
        data: {
            title: 'Create Transaction'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CreateTransactionRoutingModule {}