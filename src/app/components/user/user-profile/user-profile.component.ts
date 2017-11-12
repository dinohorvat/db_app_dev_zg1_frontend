import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {CustomerService} from "../../../services/assets/customer.service";
import {CustomerModel} from "../../../model/customer.model";
import {PermissionService} from "angular2-permission/dist";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  customer: CustomerModel;
  constructor(private router: Router, private _permissionService: PermissionService, private customerService: CustomerService, private ref: ChangeDetectorRef) { }

  ngOnInit() {
    if(this.checkPermission()){
      this.setCustomer();
    }
    else{
      this.router.navigate(["/error"]);
    }
  }

  checkPermission(){
    return this._permissionService.hasDefined('User'); // true or false
  }

  setCustomer(){
    Promise.resolve(this.customerService.fetchCustomer("1"))
        .then(response => {
          console.log(response);
          this.customer = response;
        }).catch(err => alert(err.message || err));
  }

}
