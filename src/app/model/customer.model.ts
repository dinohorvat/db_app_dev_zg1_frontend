import {TransactionsModel} from "./transactions.model";
import {RewardPointsModel} from "./reward-points.model";
import {TransactionItem} from "./transaction-item";
/**
 * Created by dinohorvat on 12/11/2017.
 */

export class CustomerModel{
    id: number;
    firstname: string;
    lastname: string;
    phone: string;
    address: string;
    city: string;
    email: string;
    transactions: TransactionItem[] = new Array<TransactionItem>();
    rewardPoints: RewardPointsModel[] = new Array<RewardPointsModel>();
    hstCustomers: any;
}