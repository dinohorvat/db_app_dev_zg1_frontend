import { Component, OnInit } from '@angular/core';
import {CompanyModel} from "../../../model/company.model";
import {CompanyService} from "../../../services/assets/company.service";
import {isNullOrUndefined} from "util";
import {GlobalService} from "../../../services/global.service";
import {BranchService} from "../../../services/assets/branch.service";
import {BranchModel} from "../../../model/branch.model";
import {LocationModel} from "../../../model/location.model";
import {RewardPolicy} from "../../../model/reward-policy";

@Component({
  selector: 'app-manager-company',
  templateUrl: './manager-company.component.html',
  styleUrls: ['./manager-company.component.scss']
})
export class ManagerCompanyComponent implements OnInit {
  company: CompanyModel;
  createBranch: BranchModel = new BranchModel;
  createLocation: LocationModel = new LocationModel;

  branchList: BranchModel[];
  selectedBranch: BranchModel;
  constructor(private branchService: BranchService, private globalService: GlobalService, private companyService: CompanyService) { }

  ngOnInit() {
    this.company = new CompanyModel;
    this.selectedBranch = new BranchModel;
    this.selectedBranch.location = new LocationModel;
    this.getCompanyObject();
  }
  getCompanyObject(){
    Promise.resolve(this.companyService.fetchCompany(1)).then(resource =>{
      if(!isNullOrUndefined(resource)){
        this.company = resource;
        this.branchList = this.company.branches;
        console.log(this.company);
      }else {
        this.globalService.showWarning("Not Found", "No results found.");
      }
    });

}
  resetCreateForm(){
    this.createBranch = new BranchModel;
    this.createLocation = new LocationModel;
  }

  newBranch(){
    this.createBranch.location = this.createLocation;
    this.createBranch.company = this.company;
    Promise.resolve(this.globalService.saveEntity(false, "branch", this.createBranch)).then(resource =>{
      if(!isNullOrUndefined(resource)){
        console.log(resource);
        this.globalService.showSuccess("Success","Branch added");
        }
        else{
        this.globalService.showWarning("Not Found", "No results found.");
      }
    });
  }
  editBranch(){
    let tempCompany: CompanyModel = new CompanyModel;
    tempCompany.id = this.company.id;
    this.selectedBranch.company = tempCompany;
    Promise.resolve(this.globalService.saveEntity(true, "branch", this.selectedBranch)).then(resource =>{
      if(!isNullOrUndefined(resource)){
        this.globalService.showSuccess("Success","Branch updated");
      }
        else{
        this.globalService.showWarning("Not Found", "No results found.");
      }
    });
  }
  showBranchDetails(branch: BranchModel){
    this.selectedBranch = branch;
  }

  removePolicy(policy: RewardPolicy){
    let idx = this.company.policies.indexOf(policy);
    this.company.policies.splice(idx,1);

    if (!isNullOrUndefined(policy.id)){
      Promise.resolve(this.companyService.removeCompanyPolicy(policy.id, this.company.id)).then(response =>{
        if(!isNullOrUndefined(response)){
          this.globalService.showSuccess("Success","Policy deleted from database.");
        }
      });
    }else {
      this.globalService.showSuccess("Success","Policy removed.");
    }
  }

  addPolicy(){
    let newPolicy = new RewardPolicy();
    this.company.policies.push(newPolicy);
  }

  saveCompany(){
    delete this.company.branches;

    Promise.resolve(this.globalService.saveEntity(true, "company", this.company)).then(resource =>{
      if(!isNullOrUndefined(resource)){
        this.globalService.showSuccess("Success","Company updated");
      }
      else{
        this.globalService.showError("Error", "Could not update.");
      }
    });
  }
}
