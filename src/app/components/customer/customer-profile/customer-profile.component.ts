import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {CustomerService} from "../../../services/assets/customer.service";
import {CustomerModel} from "../../../model/customer.model";
import {PermissionService} from "angular2-permission";
import {Router} from "@angular/router";
import {KeyCloakService} from "../../../services/keycloak/keycloak.service";
import {EmailModel} from "../../../model/email-model";
import {isNullOrUndefined} from "util";
import {GlobalService} from "../../../services/global.service";

@Component({
  selector: 'app-customer-profile',
  templateUrl: 'customer-profile.component.html',
  styleUrls: ['customer-profile.component.scss']
})
export class CustomerProfileComponent implements OnInit {

  customer: CustomerModel;
  constructor(private router: Router, private _permissionService: PermissionService,
              private customerService: CustomerService, private ref: ChangeDetectorRef,
              private keyCloakService: KeyCloakService, private globalService: GlobalService) { }

  ngOnInit() {
    if(this.checkPermission()){
      this.customer = new CustomerModel;
      this.setCustomer();
    }
    else{
      this.router.navigate(["/error"]);
    }
  }

  checkPermission(){
    return this._permissionService.hasDefined('customer'); // true or false
  }

  private setCustomer(){
    var localCustomer: CustomerModel = new CustomerModel;
    localCustomer.email = this.keyCloakService.getUser().username;
    Promise.resolve(this.customerService.findCustomerByEmail(localCustomer)).then(response => {
      if(!isNullOrUndefined(response)){
        this.customer = response;
      }else {
        alert("Register");
      }
    }).catch(err => alert(err.message || err));
  }


  public saveCustomer(){
    Promise.resolve(this.customerService.saveCustomer(true, this.customer)).then(response =>{
        if(!isNullOrUndefined(response)){
          this.customer = response;
          this.globalService.showSuccess("Success","Your information has been successfully updated");
        }
    });
  }
}
