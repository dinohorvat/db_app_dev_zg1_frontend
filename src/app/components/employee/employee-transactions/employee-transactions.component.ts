import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {EmployeeService} from "../../../services/assets/employee.service";
import {EmployeeModel} from "../../../model/employee.model";
import {TransactionsModel} from "../../../model/transactions.model";
import {TransactionsService} from "../../../services/assets/transactions.service";
import {CustomerModel} from "../../../model/customer.model";
import {CustomerService} from "../../../services/assets/customer.service";
import {GlobalService} from "../../../services/global.service";
import {PermissionService} from "angular2-permission";
import {Router} from "@angular/router";
import {resource} from "selenium-webdriver/http";
import {isNullOrUndefined} from "util";


@Component({
  selector: 'app-employee-transactions',
  templateUrl: './employee-transactions.component.html',
  styleUrls: ['./employee-transactions.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EmployeeTransactionsComponent implements OnInit {

  private employee: EmployeeModel;
  private previousTransaction: TransactionsModel [];
  private selectedTransaction: TransactionsModel;
  private recoverSelectedTransaction: TransactionsModel;
  private transactionCustomer: CustomerModel;
  private searchCustomer: CustomerModel;
  private customerSearchResults: CustomerModel[];
  private createCustomer: CustomerModel;
  private showSearchResults: boolean = false;
  private selectedCustomer: CustomerModel ;

  constructor(private router: Router, private _permissionService: PermissionService, private employeeService: EmployeeService, private transactionsService: TransactionsService,
              private customerService: CustomerService, private globalService: GlobalService, private transactionService: TransactionsService) {
    if(this.checkPermission()) {

    }
    else{
      this.router.navigate(["/error"]);
    }

    }

  ngOnInit() {
    if(this.checkPermission()) {
      this.searchCustomer = new CustomerModel;
      this.selectedTransaction = new TransactionsModel;
      this.recoverSelectedTransaction = new TransactionsModel;
      this.transactionCustomer = new CustomerModel;
      this.customerSearchResults = new Array<CustomerModel>();
      this.createCustomer = new CustomerModel;
      this.selectedCustomer = new CustomerModel;
      this.loadEmployeeInfo();
    }
    else{
    }
  }

  checkPermission(){
    return this._permissionService.hasDefined('employee'); // true or false
  }
  private loadEmployeeInfo(){
    Promise.resolve(this.employeeService.fetchEmployee(1)).then(response => {
      this.employee = response;
      this.setPreviousTransactions();
    });
  }

  private setPreviousTransactions(){
    this.previousTransaction = this.employee.transactions;
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

  public resetSearch(){
    this.searchCustomer = new CustomerModel;
    this.showSearchResults = false;
  }

  public resetCreateForm(){
    this.createCustomer = new CustomerModel;
  }

  public registerCustomer(){
    Promise.resolve(this.customerService.saveCustomer(false, this.createCustomer)).then(response => {
      this.resetCreateForm();
      this.globalService.showSuccess("Success", "Customer successfully registered.");
    });
  }


  public searchCustomers(){

    if(!isNullOrUndefined(this.searchCustomer.id)){
      Promise.resolve(this.customerService.fetchCustomer(this.searchCustomer.id)).then(resource =>{
        if(!isNullOrUndefined(resource)){
          this.customerSearchResults = new Array<CustomerModel>();
          this.customerSearchResults.push(resource);
          this.showSearchResults = true;
        }else {
          Promise.resolve(this.customerService.searchCustomers(this.searchCustomer)).then(resource =>{
            if(!isNullOrUndefined(resource)){
              this.customerSearchResults = resource;
              this.showSearchResults = true;
            }else {
              this.globalService.showWarning("Not Found", "No results found.");
            }
          });
        }
      });
    }else {
      Promise.resolve(this.customerService.searchCustomers(this.searchCustomer)).then(resource =>{
        if(!isNullOrUndefined(resource)){
          this.customerSearchResults = resource;
          this.showSearchResults = true;
        }else {
          this.globalService.showWarning("Not Found", "No results found.");
        }
      });
    }
  }


  public showCustomerDetails(customer: CustomerModel){
    this.selectedCustomer = customer;
  }

  public switchToCustomer(customerId: number){
    Promise.resolve(this.customerService.fetchCustomer(customerId)).then(resource =>{
      if(!isNullOrUndefined(resource)) {
        this.selectedCustomer = resource;
      }
    });
  }

  public saveTransactions(){
    Promise.resolve(this.transactionsService.saveTransactions(true, this.selectedTransaction)).then(response =>{
      if(!isNullOrUndefined(response)){
        this.globalService.showSuccess("Success", "Transaction Updated.");
      }
    });
  }
}
