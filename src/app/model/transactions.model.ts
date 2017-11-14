import {DcsDate} from "./dcs-date";
/**
 * Created by dinohorvat on 12/11/2017.
 */
export class TransactionsModel {
    id: number;
    totalPrice: number;
    status: string;
    branch: any;
    transactionItems: any;
    hstTransactions: any;
    dcsDate: DcsDate = new DcsDate;
}