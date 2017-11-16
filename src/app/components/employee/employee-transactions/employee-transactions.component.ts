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

  constructor(private router: Router, private _permissionService: PermissionService, private employeeService: EmployeeService, private transactionsService: TransactionsService,
              private customerService: CustomerService, private globalService: GlobalService) {
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


  public search(){
    alert('Search!');
  }
}
