import { Component, OnInit } from '@angular/core';
import {BranchService} from "../../../../services/assets/branch.service";
import {HstBranch} from "../../../../model/hst/branch-hst";

@Component({
  selector: 'app-manager-branch-history',
  templateUrl: './manager-branch-history.component.html',
  styleUrls: ['./manager-branch-history.component.scss']
})
export class ManagerBranchHistoryComponent implements OnInit {

  private branchHistory: HstBranch[];
  constructor(private branchService: BranchService) { }

  ngOnInit() {
    this.branchHistory = this.branchService.hstBrnach;
  }

}
