import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {KeyCloakService} from "../../../services/keycloak/keycloak.service";

@Component({
  selector: 'app-logout-screen',
  templateUrl: './logout-screen.component.html',
  styleUrls: ['./logout-screen.component.scss']
})
export class LogoutScreenComponent implements OnInit {

  constructor(private router:Router, private keyCloakService: KeyCloakService) { }

  ngOnInit() {
    Promise.resolve(this.keyCloakService.logOut())
        .then(response => {
          this.login();
        })
        .catch(error => {
          //TODO napravi error handling
          console.log(error);
        });
  }

  login():void{
    this.router.navigate(["/login"]);
  }

}
