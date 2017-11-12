/**
 * Created by dinohorvat on 11/11/2017.
 */
import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions} from '@angular/http';
import {BehaviorSubject} from "rxjs";
import {environment} from '../../environments/environment';
import {isUndefined} from "util";
import 'rxjs/add/operator/toPromise';

import {Router} from "@angular/router";
import {CompanyService} from "./assets/company.service";


@Injectable()
export class GlobalService{
    headers = new Headers({ 'Content-Type': 'application/json' });
    options = new RequestOptions({ headers: this.headers });

    constructor (private companyService: CompanyService,
                 private http: Http,
                 private router:Router) {}




    }