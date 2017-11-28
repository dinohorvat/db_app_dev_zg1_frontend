import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ManagerBranchHistoryComponent} from "app/components/manager/manager-branch/manager-branch-history/manager-branch-history.component";
/**
 * Created by HrvojeGrgic on 28/11/2017.
 */
const routes: Routes = [
    {
        path: '',
        component: ManagerBranchHistoryComponent,
        data: {
            title: 'History'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManagerBranchHistoryRoutingModule {}