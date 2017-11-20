import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BranchService} from "../../../services/assets/branch.service";
import {isNullOrUndefined} from "util";
import {BranchModel} from "../../../model/branch.model";

@Component({
  selector: 'app-manager-branch',
  templateUrl: './manager-branch.component.html',
  styleUrls: ['./manager-branch.component.scss']
})
export class ManagerBranchComponent implements OnInit {

  branch: BranchModel;
  id: number;

  employeesNumber: number;
  transactionsNumber: number;

  constructor(private branchService: BranchService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id = Number.parseInt(params['id']);
    });
    this.getBranchObject(this.id);

  }
  getBranchObject(id: number){
    Promise.resolve(this.branchService.fetchBranch(id))
        .then(response => {
          if(!isNullOrUndefined(response)){
            this.branch = response;
            this.employeesNumber = this.branch.employees.length;
            this.transactionsNumber = this.branch.transactions.length;
            console.log(this.branch)
          }
        });

  }
}
