import { Component, OnInit } from '@angular/core';
import {CustomerModel} from "../../../model/customer.model";
import {CustomerService} from "../../../services/assets/customer.service";
import {GlobalService} from "../../../services/global.service";
import {isNullOrUndefined} from "util";
import {KeyCloakService} from "../../../services/keycloak/keycloak.service";
import {TransactionsService} from "../../../services/assets/transactions.service";
import {TransactionsModel} from "../../../model/transactions.model";

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
}
