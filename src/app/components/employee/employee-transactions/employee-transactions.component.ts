import { Component, OnInit } from '@angular/core';
import {EmployeeService} from "../../../services/assets/employee.service";
import {EmployeeModel} from "../../../model/employee.model";
import {TransactionsModel} from "../../../model/transactions.model";
import {TransactionsService} from "../../../services/assets/transactions.service";


@Component({
  selector: 'app-employee-transactions',
  templateUrl: './employee-transactions.component.html',
  styleUrls: ['./employee-transactions.component.scss']
})
export class EmployeeTransactionsComponent implements OnInit {

  private employee: EmployeeModel;
  private previousTransaction: TransactionsModel [];
  private selectedTransaction: TransactionsModel;
  private recoverSelectedTransaction: TransactionsModel;

  constructor(private employeeService: EmployeeService, private transactionsService: TransactionsService) { }

  ngOnInit() {
    this.selectedTransaction = new TransactionsModel;
    this.recoverSelectedTransaction = new TransactionsModel;
    this.loadEmployeeInfo();
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
      });
    }else {
      this.selectedTransaction = Object.assign({}, this.recoverSelectedTransaction);
    }
  }
}
