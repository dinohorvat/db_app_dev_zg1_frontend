import { Component, OnInit } from '@angular/core';
import {CompanyModel} from "../../model/company.model";
import {BranchModel} from "../../model/branch.model";
import {CompanyService} from "../../services/assets/company.service";
import {isNullOrUndefined} from "util";
import {GlobalService} from "../../services/global.service";
import {Headers, Http,RequestOptions} from "@angular/http";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    headers = new Headers({});
    options = new RequestOptions({headers: this.headers});
  lat: number = 45.1289688;
  lng: number = 15.9537341;
  apiToken: string = 'AIzaSyDFX1UQow1MdphPv9UII83Ih_sLVuhxM7E';

  company: CompanyModel;
  branchList: BranchModel[] = [];
  markers = [];

  constructor(private http: Http,private companyService: CompanyService, private globalService:GlobalService) {
      this.getCompany();
  }

  ngOnInit() {
  }

  getCompany(){
      Promise.resolve(this.companyService.fetchCompany(1)).then(resource =>{
          if(!isNullOrUndefined(resource)){
              this.company = resource;
              this.branchList = this.company.branches;
              this.getCoordinates();
          }else {
              this.globalService.showWarning("Not Found", "No results found.");
          }
      });
  }

  getCoordinates(){
      for(var i = 0; i< this.branchList.length; i++){
          let address = this.branchList[i].location.address;
          console.log(this.company);
          this.http.get("https://maps.googleapis.com/maps/api/geocode/json?address="+address+"&key" + this.apiToken, this.options)
              .toPromise()
              .then(response => {
                  let locationObj:any = response.json().results[0];
                  let coordinates = locationObj.geometry.location;
                  console.log(coordinates)
                  this.markers.push(coordinates);
              })
              .catch(this.handleError);
      }

  }
    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}
