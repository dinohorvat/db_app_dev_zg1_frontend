import { Component, OnInit } from '@angular/core';
import {CustomerModel} from "../../../model/customer.model";
import {CustomerService} from "../../../services/assets/customer.service";
import {GlobalService} from "../../../services/global.service";
import {isNullOrUndefined} from "util";
import {KeyCloakService} from "../../../services/keycloak/keycloak.service";
import {TransactionsService} from "../../../services/assets/transactions.service";
import {TransactionsModel} from "../../../model/transactions.model";
import {TransactionItem} from "../../../model/transaction-item";

@Component({
  selector: 'app-service-info',
  templateUrl: './transaction-info.component.html',
  styleUrls: ['./transaction-info.component.scss']
})
export class TransactionInfoComponent implements OnInit {

  private customer: CustomerModel;
  private selectedTransaction: TransactionsModel;


  constructor(private customerService: CustomerService, private globalService: GlobalService,
              private keyCloakService: KeyCloakService, private transactionService: TransactionsService) { }

  ngOnInit() {
    this.customer = new CustomerModel;
    this.selectedTransaction = new TransactionsModel;
    this.setCustomer()
  }

  private setCustomer(){
    var localCustomer: CustomerModel = new CustomerModel;
    localCustomer.email = this.keyCloakService.getUser().username;
    Promise.resolve(this.customerService.findCustomerByEmail(localCustomer)).then(response => {
      if(!isNullOrUndefined(response)){
        this.customer = response;
        this.customer.transactions = this.filterDuplicateTransactions(this.customer.transactions);
      }else {
      }
    }).catch(err => alert(err.message || err));
  }

  public checkStatus(status: string): string {
    return this.transactionService.checkStatus(status)
  }

  public showSelectedDetails(id:number){
    Promise.resolve(this.transactionService.fetchTransactions(id)).then(response =>{
      if(!isNullOrUndefined(response)){
        this.selectedTransaction = response;
      }
    })
  }

  private filterDuplicateTransactions(items: TransactionItem[]): TransactionItem[] {
    let filteredList: TransactionItem[] = new Array<TransactionItem>();

    if (!isNullOrUndefined(items)) {
      for (let i = 0; i < items.length; i++) {
        let j = i;
        while (j < items.length && items[i].transaction.id == items[j].transaction.id) {
          j++;
        }

        filteredList.push(items[i]);
        i = j;
      }
    }

    return filteredList;
  }
}
