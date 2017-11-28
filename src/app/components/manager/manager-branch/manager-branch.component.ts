import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BranchService} from "../../../services/assets/branch.service";
import {isNullOrUndefined} from "util";
import {BranchModel} from "../../../model/branch.model";
import {EmployeeModel} from "../../../model/employee.model";
import {EmployeeService} from "../../../services/assets/employee.service";
import {ProductService} from "../../../services/assets/product.service";
import {TransactionsService} from "../../../services/assets/transactions.service";
import {TransactionsModel} from "../../../model/transactions.model";
import {HstBranch} from "../../../model/hst/branch-hst";

@Component({
  selector: 'app-manager-branch',
  templateUrl: './manager-branch.component.html',
  styleUrls: ['./manager-branch.component.scss']
})
export class ManagerBranchComponent implements OnInit {

  branch: BranchModel;
  employees: EmployeeModel[];
  transactions: TransactionsModel[];
  branchHst: HstBranch[];

  id: any;

  employeesNumber: number;
  transactionsNumber: number;
  historyNumber: number;

  initialLoadBlock: boolean = true;

  constructor(private transactionService: TransactionsService, private employeeService: EmployeeService, private branchService: BranchService, private activatedRoute: ActivatedRoute) {
    activatedRoute.paramMap.subscribe(params =>{
      this.id = params.get('id');
      this.getBranchObject(this.id);
    });
  }

  ngOnInit() {
  }
  getBranchObject(id: number){
    Promise.resolve(this.branchService.fetchBranch(id))
        .then(response => {
          if(!isNullOrUndefined(response)){
            this.branch = response;
            this.employees = this.branch.employees;
            this.transactions = this.branch.transactions;
            this.branchHst = this.branch.hstBranches;


            this.employeesNumber = this.branch.employees.length;
            this.transactionsNumber = this.branch.transactions.length;
            this.historyNumber = this.branch.hstBranches.length;

            this.employeeService.employees = this.employees;
            this.transactionService.transactions = this.transactions;
            this.branchService.hstBrnach = this.branchHst;
          }
          this.initialLoadBlock = false;
        });

  }
}
