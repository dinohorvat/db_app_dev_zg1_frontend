import { Component } from '@angular/core';
import {GlobalService} from "./services/global.service";
import {Router} from "@angular/router";
import {KeyCloakService} from "./services/keycloak/keycloak.service";
import { isNullOrUndefined } from "util";

@Component({
    selector: 'body',
    template: '<router-outlet></router-outlet>'
})
export class AppComponent {
    private user: any;

    constructor(private globalService: GlobalService, private router: Router, private keyCloakService: KeyCloakService) {
    }

    ngOnInit(): void {
        // this.user = this.keyCloakService.getUser();
        // if (isNullOrUndefined(this.user)) {
        //     this.router.navigate(["/login"]);
        // }
    }
}
