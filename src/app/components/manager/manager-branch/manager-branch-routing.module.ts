/**
 * Created by dinohorvat on 19/11/2017.
 */
import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ManagerBranchComponent} from "./manager-branch.component";

const routes: Routes = [
    {
        path: '',
        component: ManagerBranchComponent,
        data: {
            title: 'Branch'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManagerBranchRoutingModule {}