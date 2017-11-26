import { Component, OnInit } from '@angular/core';
import {CustomerModel} from "../../../model/customer.model";
import {CustomerService} from "../../../services/assets/customer.service";
import {GlobalService} from "../../../services/global.service";
import {KeyCloakService} from "../../../services/keycloak/keycloak.service";
import {TransactionsService} from "../../../services/assets/transactions.service";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.scss']
})
export class RewardsComponent implements OnInit {

  private customer: CustomerModel;
  private totalAmountPoints = 0;

  constructor(private customerService: CustomerService, private globalService: GlobalService,
              private keyCloakService: KeyCloakService, private transactionService: TransactionsService) { }


  ngOnInit() {
    this.customer = new CustomerModel;
    this.setCustomer();
    this.showRewards();
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

  private showRewards(){
    for(let reward of this.customer.rewardPoints){
      this.totalAmountPoints += reward.amount;
    }
  }

}
