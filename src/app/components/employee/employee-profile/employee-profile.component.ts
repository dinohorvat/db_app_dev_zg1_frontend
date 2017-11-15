import { Component, OnInit } from '@angular/core';
import {EmployeeService} from "../../../services/assets/employee.service";
import {EmployeeModel} from "../../../model/employee.model";

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.scss']
})
export class EmployeeProfileComponent implements OnInit {

  private employee: EmployeeModel;

  constructor(private employeeService: EmployeeService) {

  }

  ngOnInit() {
    this.employee = new EmployeeModel;
    this.loadEmployeeData();
  }



  private loadEmployeeData(){
    Promise.resolve(this.employeeService.fetchEmployee(1)).then(response => {
      this.employee = response;
    });
  }

}
