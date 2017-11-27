import { Component, OnInit } from '@angular/core';
import {EmployeeService} from "../../../../services/assets/employee.service";
import {EmployeeModel} from "../../../../model/employee.model";
import {BranchModel} from "../../../../model/branch.model";
import {CompanyService} from "../../../../services/assets/company.service";
import {isNullOrUndefined} from "util";
import {GlobalService} from "../../../../services/global.service";
import {KeyCloakService} from "../../../../services/keycloak/keycloak.service";

@Component({
  selector: 'app-manager-employee',
  templateUrl: 'manager-employee.component.html',
  styleUrls: ['manager-employee.component.scss']
})
export class ManagerEmployeeComponent implements OnInit {

  employees: EmployeeModel[];
  employee: EmployeeModel = new EmployeeModel;

  createEmployee: EmployeeModel = new EmployeeModel;

  branchList: BranchModel[] = [];
  selectedBranch: BranchModel = new BranchModel;
  constructor(private keyCloakService: KeyCloakService, private globalService: GlobalService, private companyService: CompanyService,private employeeService:EmployeeService ){
  }

  ngOnInit() {
    this.employees = this.employeeService.employees;
    this.getCompanyObject();
  }
  getCompanyObject() {
    Promise.resolve(this.companyService.fetchCompany(1)).then(resource => {
      if (!isNullOrUndefined(resource)) {
        let company = resource;
        this.branchList = company.branches;
      } else {
      }
    });
  }
  showEmployee(id: number){
    Promise.resolve(this.employeeService.fetchEmployee(id)).then(response => {
      this.employee = response;
      this.selectedBranch = this.employee.branch;
    });
  }
  newEmployee(){
    this.createEmployee.branch = this.selectedBranch;
    Promise.resolve(this.globalService.saveEntity(false, "employee", this.createEmployee)).then(resource =>{
      if(!isNullOrUndefined(resource)){
        this.keyCloakService.registerUser(this.createEmployee, "employee");

        this.globalService.showSuccess("Success","Employee Created");
      }
    });
  }
  editEmployee(){
      this.employee.branch = this.selectedBranch;
      this.employee.hstEmployees = [];
      this.employee.transactions = null;
      Promise.resolve(this.globalService.saveEntity(true, "employee", this.employee)).then(resource =>{
      if(!isNullOrUndefined(resource)){
        console.log(resource);
        this.globalService.showSuccess("Success","Employee updated");
      }
      else{
        this.globalService.showError("Error", "Update failed.");
      }
    });
  }

}
