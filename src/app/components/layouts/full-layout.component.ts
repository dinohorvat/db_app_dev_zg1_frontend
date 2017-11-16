import { Component, OnInit } from '@angular/core';
import {PermissionService} from "angular2-permission";
import {KeyCloakService} from "../../services/keycloak/keycloak.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: 'full-layout.component.html'
})
export class FullLayoutComponent implements OnInit {
  user: any;

  constructor(private permissionService: PermissionService, keyCloakService: KeyCloakService) {
    this.user = keyCloakService.getUser();
    console.log(this.user);
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

  ngOnInit(): void {}
}
