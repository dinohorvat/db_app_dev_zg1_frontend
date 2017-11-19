import {DcsDate} from "./dcs-date";
import {HstTransaction} from "./hst/transaction-hst";
import {TransactionItem} from "./transaction-item";
import {BranchModel} from "./branch.model";
import {EmployeeModel} from "./employee.model";
/**
 * Created by dinohorvat on 12/11/2017.
 */
export class TransactionsModel {
    id: number;
    totalPrice: number = 0;
    status: string;
    branch: BranchModel = new BranchModel;
    employee: EmployeeModel = new EmployeeModel;
    transactionItems: TransactionItem[] = new Array<TransactionItem>();
    hstTransactions: HstTransaction[] = new Array<HstTransaction>();
    dcsDate: DcsDate = new DcsDate;
}