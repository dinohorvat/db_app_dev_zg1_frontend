import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {Http} from "@angular/http";
import "rxjs/add/operator/toPromise";
import {environment} from "../../../../environments/environment";
import {isNullOrUndefined} from "util";
import {GlobalService} from "../../../services/global.service";
import {KeyCloakService} from "../../../services/keycloak/keycloak.service";

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
})
export class LoginScreenComponent implements OnInit {
  private user: any;
  constructor(private router: Router, private keyCloakService: KeyCloakService, private http: Http) {
  }

  ngOnInit() {
    console.log('calling this.keyCloakService.init');
    Promise.resolve(this.keyCloakService.init(environment.keyCloak.clientId,
        environment.applicationUrl + '/login',
        environment.keyCloak.basicUrl))
        .then(response => {
          if(!isNullOrUndefined(response)){
            this.user = this.keyCloakService.getUser();
            this.router.navigate(["/home"]);
          }
        })
        .catch(error => {
          //TODO napravi error handling
          console.log(error);
        });
  }

}
