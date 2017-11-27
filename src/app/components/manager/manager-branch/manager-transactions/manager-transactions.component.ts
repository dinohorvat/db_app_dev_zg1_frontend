import { Component, OnInit } from '@angular/core';
import {TransactionsService} from "../../../../services/assets/transactions.service";
import {TransactionsModel} from "../../../../model/transactions.model";
import {CustomerModel} from "../../../../model/customer.model";
import {GlobalService} from "../../../../services/global.service";
import {isNullOrUndefined} from "util";
import {EmailModel} from "../../../../model/email-model";
import {CustomerService} from "../../../../services/assets/customer.service";

@Component({
  selector: 'app-manager-transactions',
  templateUrl: 'manager-transactions.component.html',
  styleUrls: ['manager-transactions.component.scss']
})
export class ManagerTransactionsComponent implements OnInit {

  transactions: TransactionsModel[];
  transactionCustomer: CustomerModel = new CustomerModel;
  selectedTransaction: TransactionsModel = new TransactionsModel;
  recoverSelectedTransaction: TransactionsModel = new TransactionsModel;
  transactionStatusOptions;


  constructor(private globalService: GlobalService, private customerService: CustomerService, private transactionsService: TransactionsService) { }

  ngOnInit() {
    this.transactions = this.transactionsService.transactions;
    this.transactionStatusOptions = this.globalService.statusOptions;

  }
  public checkStatus(status: string): string {
    return this.transactionsService.checkStatus(status)
  }
  public showSelectedDetails(selectedTransactionId: number){
    if(this.selectedTransaction.id != selectedTransactionId){
      Promise.resolve(this.transactionsService.fetchTransactions(selectedTransactionId)).then(response => {
        this.selectedTransaction = response;
        this.recoverSelectedTransaction = Object.assign({},response);

        if(this.selectedTransaction.transactionItems.length > 0){
          this.transactionCustomer = this.selectedTransaction.transactionItems[0].customer;
        }
      });
    }else {
      this.selectedTransaction = Object.assign({}, this.recoverSelectedTransaction);
      if(this.selectedTransaction.transactionItems.length > 0){
        this.transactionCustomer = this.selectedTransaction.transactionItems[0].customer;
      }
    }
  }
  public refreshStatusInComponentsObjects(response){
    for(let trans of this.transactions){
      if(trans.id == response.id){
        trans = response;
      }
    }
    this.selectedTransaction = response;
  }
  public saveTransactions(){
    Promise.resolve(this.transactionsService.saveTransactions(true, this.selectedTransaction)).then(response =>{
      if(!isNullOrUndefined(response)){

        this.refreshStatusInComponentsObjects(response);


        this.globalService.showSuccess("Success", "Transaction Updated.");
        var emailModel:EmailModel = new EmailModel(this.transactionCustomer.email, "Automated Message",
            `Your transaction has been updated.
             \nTransaction Number: ${this.selectedTransaction.id}
             \nCurrent status: ${this.selectedTransaction.status}
             \nCurrent completion date: ${this.selectedTransaction.dcsDate.transactionExpCompleted}`);
        this.customerService.notifyCustomer(emailModel);
      }
    });
  }
}
