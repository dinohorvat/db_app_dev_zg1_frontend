import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BranchService} from "../../../services/assets/branch.service";
import {isNullOrUndefined} from "util";
import {BranchModel} from "../../../model/branch.model";
import {EmployeeModel} from "../../../model/employee.model";
import {EmployeeService} from "../../../services/assets/employee.service";

@Component({
  selector: 'app-manager-branch',
  templateUrl: './manager-branch.component.html',
  styleUrls: ['./manager-branch.component.scss']
})
export class ManagerBranchComponent implements OnInit {

  branch: BranchModel;
  employees: EmployeeModel[];
  id: number;

  employeesNumber: number;
  transactionsNumber: number;

  constructor(private employeeService: EmployeeService, private branchService: BranchService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id = Number.parseInt(params['id']);
    });
    this.getBranchObject(this.id);

  }
  getBranchObject(id: number){
    Promise.resolve(this.branchService.fetchBranch(id))
        .then(response => {
          if(!isNullOrUndefined(response)){
            this.branch = response;
            this.employees = this.branch.employees;
            this.employeesNumber = this.branch.employees.length;
            this.transactionsNumber = this.branch.transactions.length;

            this.employeeService.employees = this.employees
            console.log(this.branch);
          }
        });

  }
}
