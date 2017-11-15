import {DcsDate} from "./dcs-date";
import {HstTransaction} from "./hst/transaction-hst";
import {TransactionItem} from "./transaction-item";
/**
 * Created by dinohorvat on 12/11/2017.
 */
export class TransactionsModel {
    id: number;
    totalPrice: number;
    status: string;
    branch: any;
    transactionItems: TransactionItem[] = new Array<TransactionItem>();
    hstTransactions: HstTransaction[] = new Array<HstTransaction>();
    dcsDate: DcsDate = new DcsDate;
}