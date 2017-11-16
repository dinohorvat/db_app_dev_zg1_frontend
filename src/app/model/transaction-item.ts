import {ProductModel} from "./product.model";
import {CustomerModel} from "./customer.model";
import {TransactionsModel} from "./transactions.model";
/**
 * Created by HrvojeGrgic on 15/11/2017.
 */

export class TransactionItem{
    product: ProductModel = new ProductModel
    customer: CustomerModel = new CustomerModel
    transaction:TransactionsModel = new TransactionsModel;
}