import { Component, OnInit } from '@angular/core';
import {PermissionService} from "angular2-permission";
import {KeyCloakService} from "../../services/keycloak/keycloak.service";
import {CompanyService} from "../../services/assets/company.service";
import {isNullOrUndefined} from "util";
import {CompanyModel} from "../../model/company.model";
import {BranchModel} from "../../model/branch.model";

@Component({
  selector: 'app-dashboard',
  templateUrl: 'full-layout.component.html'
})
export class FullLayoutComponent implements OnInit {
  user: any;
  company: CompanyModel;
  branches: BranchModel[];
  constructor(private permissionService: PermissionService, keyCloakService: KeyCloakService, private companyService: CompanyService) {

    this.user = keyCloakService.getUser();
    for(var i=0; i<this.user.roles.length; i++){
      console.log(this.user.roles[i]);
      this.permissionService.add(this.user.roles[i]);
    }
  }

  public disabled:boolean = false;
  public status:{isopen:boolean} = {isopen: false};

  public toggled(open:boolean):void {
    console.log('Dropdown is now: ', open);
  }

  public toggleDropdown($event:MouseEvent):void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }
  public getBranches(){
    Promise.resolve(this.companyService.fetchCompany(1))
        .then(response => {
          if(!isNullOrUndefined(response)){
            this.company = response;
            this.branches = this.company.branches;
          }
  });
  }

  ngOnInit(): void {
    this.getBranches();
  }
}
