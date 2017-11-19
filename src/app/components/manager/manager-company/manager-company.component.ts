import { Component, OnInit } from '@angular/core';
import {CompanyModel} from "../../../model/company.model";
import {CompanyService} from "../../../services/assets/company.service";
import {isNullOrUndefined} from "util";
import {GlobalService} from "../../../services/global.service";

@Component({
  selector: 'app-manager-company',
  templateUrl: './manager-company.component.html',
  styleUrls: ['./manager-company.component.scss']
})
export class ManagerCompanyComponent implements OnInit {
  company: CompanyModel;
  constructor(private globalService: GlobalService, private companyService: CompanyService) { }

  ngOnInit() {
    this.getCompanyObject();
  }
  getCompanyObject(){
    Promise.resolve(this.companyService.fetchCompany('1')).then(resource =>{
      if(!isNullOrUndefined(resource)){
        this.company = resource;
        console.log(this.company);
      }else {
        this.globalService.showWarning("Not Found", "No results found.");
      }
    });
}
}
