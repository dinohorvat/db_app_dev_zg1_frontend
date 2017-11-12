import {TransactionsModel} from "./transactions.model";
import {RewardPointsModel} from "./reward-points.model";
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
    transactions: TransactionsModel[];
    rewardPoints: RewardPointsModel[];
    hstCustomers: any;
}