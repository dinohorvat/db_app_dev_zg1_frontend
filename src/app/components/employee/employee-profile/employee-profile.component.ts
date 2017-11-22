import { Component, OnInit } from '@angular/core';
import {EmployeeService} from "../../../services/assets/employee.service";
import {EmployeeModel} from "../../../model/employee.model";
import {isNullOrUndefined} from "util";
import {KeyCloakService} from "../../../services/keycloak/keycloak.service";

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.scss']
})
export class EmployeeProfileComponent implements OnInit {

  private employee: EmployeeModel;

  constructor(private employeeService: EmployeeService, private keycloakService: KeyCloakService) {

  }

  ngOnInit() {
    this.employee = new EmployeeModel;
    this.loadEmployeeInfo();
  }



  private loadEmployeeInfo(){
    var localEmployee: EmployeeModel = new EmployeeModel;
    localEmployee.username = this.keycloakService.getUser().username;
    Promise.resolve(this.employeeService.findEmployeeByUsername(localEmployee)).then(response => {
      if(!isNullOrUndefined(response)){
        this.employee = response;
      }else {
        console.log("Error : " + this.keycloakService.getUser().username );
        console.log("Usr Obj : " + this.keycloakService.getUser() );
      }

    });
  }

}
