import {CompanyModel} from "./company.model";
import {LocationModel} from "./location.model";
import {TransactionsModel} from "./transactions.model";
import {EmployeeModel} from "./employee.model";
/**
 * Created by dinohorvat on 12/11/2017.
 */
export class BranchModel {
    id: number;
    code: string;
    name: string;
    company: CompanyModel;
    location: LocationModel;
    hstBranches: any;
    transactions: TransactionsModel[];
    employees: EmployeeModel[];
}