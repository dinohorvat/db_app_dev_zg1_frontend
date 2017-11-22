import { Component, OnInit } from '@angular/core';
import {EmployeeService} from "../../../../services/assets/employee.service";
import {EmployeeModel} from "../../../../model/employee.model";

@Component({
  selector: 'app-manager-employee',
  templateUrl: 'manager-employee.component.html',
  styleUrls: ['manager-employee.component.scss']
})
export class ManagerEmployeeComponent implements OnInit {

  employees: EmployeeModel[];
  employee: EmployeeModel;
  constructor(private employeeService:EmployeeService ){
  }

  ngOnInit() {
    this.employees = this.employeeService.employees;
  }

  showEmployee(id: number){
    Promise.resolve(this.employeeService.fetchEmployee(id)).then(response => {
      this.employee = response;
    });
  }

}
