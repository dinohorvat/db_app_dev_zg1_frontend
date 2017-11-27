import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
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
import {EmailModel} from "../../../model/email-model";
import {KeyCloakService} from "../../../services/keycloak/keycloak.service";
import {TransactionItem} from "../../../model/transaction-item";


@Component({
  selector: 'app-employee-transactions',
  templateUrl: './employee-transactions.component.html',
  styleUrls: ['./employee-transactions.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EmployeeTransactionsComponent implements OnInit {

  showInitialLoadBlock: boolean = true;
  secondaryLoadBlock: boolean = false;

  private employee: EmployeeModel;
  private previousTransaction: TransactionsModel [];
  private selectedTransaction: TransactionsModel;
  private recoverSelectedTransaction: TransactionsModel;
  private transactionCustomer: CustomerModel;
  private searchCustomer: CustomerModel;
  private customerSearchResults: CustomerModel[];
  private createCustomer: CustomerModel;
  private showSearchResults: boolean = false;
  private selectedCustomer: CustomerModel;
  private transactionStatusOptions;
  private filteredListOfCustomerTransactions: TransactionItem[];

  constructor(private router: Router, private _permissionService: PermissionService,
              private employeeService: EmployeeService,
              private transactionsService: TransactionsService, private customerService: CustomerService,
              private globalService: GlobalService, private transactionService: TransactionsService,
              private keycloakService: KeyCloakService) {
    if(this.checkPermission()) {

    }
    else{
      this.router.navigate(["/error"]);
    }

    }

  ngOnInit() {
    if(this.checkPermission()) {
      this.filteredListOfCustomerTransactions = new Array<TransactionItem>();
      this.transactionStatusOptions = this.globalService.statusOptions;
      this.searchCustomer = new CustomerModel;
      this.previousTransaction = new Array<TransactionsModel>();
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
    return this._permissionService.hasOneDefined(['employee','owner']); // true or false
  }

  private loadEmployeeInfo(){
    var localEmployee: EmployeeModel = new EmployeeModel;
    localEmployee.username = this.keycloakService.getUser().username;
    Promise.resolve(this.employeeService.findEmployeeByUsername(localEmployee)).then(response => {
      if(!isNullOrUndefined(response)){
        this.employee = response;
        this.setPreviousTransactions()
        this.showInitialLoadBlock = false;
      }else {
        console.log("Error : " + this.keycloakService.getUser().username );
        console.log("Usr Obj : " + this.keycloakService.getUser() );
      }

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
      if(!isNullOrUndefined(response)){
        let generate_password = Math.random().toString(36).slice(-8);
        this.createCustomer.password = generate_password;

        this.keycloakService.registerUser(this.createCustomer, "customer");
        var emailModel:EmailModel = new EmailModel(this.createCustomer.email, "Welcome to DRY Cleaners!",
            `Your account has been created.
             \nUsername: ${this.createCustomer.email}
             \nPassword: ${this.createCustomer.password}`);
        this.customerService.notifyCustomer(emailModel);
        this.resetCreateForm();

        this.globalService.showSuccess("Success", "Customer successfully registered.");
      }
    });
  }


  public searchCustomers(){
    this.secondaryLoadBlock = true;

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

        this.secondaryLoadBlock = false;
      });
    }else {
      if(!isNullOrUndefined(this.searchCustomer.email) || !isNullOrUndefined(this.searchCustomer.firstname)
          || !isNullOrUndefined(this.searchCustomer.lastname)){

        Promise.resolve(this.customerService.searchCustomers(this.searchCustomer)).then(resource =>{
          if(!isNullOrUndefined(resource)){
            this.customerSearchResults = resource;
            this.showSearchResults = true;
          }else {
            this.globalService.showWarning("Not Found", "No results found.");
          }

          this.secondaryLoadBlock = false;
        });
      }else {
        this.secondaryLoadBlock = false;
        this.globalService.showError("No search condition","Please enter search condition");
      }
    }
  }


  public showCustomerDetails(customer: CustomerModel){
    this.selectedCustomer = customer;
    this.selectedCustomer.transactions = this.filterDuplicateTransactions(this.selectedCustomer.transactions);
  }

  public switchToCustomer(customerId: number){
    Promise.resolve(this.customerService.fetchCustomer(customerId)).then(resource =>{
      if(!isNullOrUndefined(resource)) {
        this.selectedCustomer = resource;
        this.selectedCustomer.transactions = this.filterDuplicateTransactions(this.selectedCustomer.transactions);
      }
    });
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

  public checkStatus(status: string): string {
    return this.transactionsService.checkStatus(status)
  }

  public refreshStatusInComponentsObjects(response){
    for(let trans of this.previousTransaction){
      if(trans.id == response.id){
        trans = response;
      }
    }
    this.selectedTransaction = response;
  }

  public filterDuplicateTransactions(items: TransactionItem[]): TransactionItem[]{
    let filteredList: TransactionItem[] = new Array<TransactionItem>();

    if(!isNullOrUndefined(items)){
      for(let i=0; i<items.length; i++){
        let j = i;
        while(j<items.length && items[i].transaction.id == items[j].transaction.id){
          j++;
        }

        filteredList.push(items[i]);
        i=j;
      }
    }


    return filteredList;
  }



}
