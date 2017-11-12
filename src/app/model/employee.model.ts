import {TransactionsModel} from "./transactions.model";
import {BranchModel} from "./branch.model";
export class EmployeeModel {
    id: number;
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    transactions: TransactionsModel[];
    brahcn: BranchModel;
    hstEmployees: any;
}