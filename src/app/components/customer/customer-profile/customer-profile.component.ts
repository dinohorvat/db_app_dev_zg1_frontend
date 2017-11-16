import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {CustomerService} from "../../../services/assets/customer.service";
import {CustomerModel} from "../../../model/customer.model";
import {PermissionService} from "angular2-permission";
import {Router} from "@angular/router";

@Component({
  selector: 'app-customer-profile',
  templateUrl: 'customer-profile.component.html',
  styleUrls: ['customer-profile.component.scss']
})
export class CustomerProfileComponent implements OnInit {

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
    return this._permissionService.hasDefined('customer'); // true or false
  }

  setCustomer(){
    Promise.resolve(this.customerService.fetchCustomer(1))
        .then(response => {
          console.log(response);
          this.customer = response;
        }).catch(err => alert(err.message || err));
  }

}
