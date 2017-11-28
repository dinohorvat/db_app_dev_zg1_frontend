import {CompanyModel} from "./company.model";
import {LocationModel} from "./location.model";
import {TransactionsModel} from "./transactions.model";
import {EmployeeModel} from "./employee.model";
import {HstBranch} from "./hst/branch-hst";
/**
 * Created by dinohorvat on 12/11/2017.
 */
export class BranchModel {
    id: number;
    code: string;
    name: string;
    company: CompanyModel;
    location: LocationModel;
    hstBranches: HstBranch[] = new Array<HstBranch>();
    transactions: TransactionsModel[];
    employees: EmployeeModel[];
}