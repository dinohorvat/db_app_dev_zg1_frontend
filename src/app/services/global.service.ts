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
import {ToasterConfig, ToasterService} from "angular2-toaster";


@Injectable()
export class GlobalService{

    headers = new Headers({ 'Content-Type': 'application/json' });
    options = new RequestOptions({ headers: this.headers });

    constructor (private companyService: CompanyService,
                 private http: Http,
                 private router:Router,
                 private toasterService: ToasterService) {
    }

    public toasterconfig : ToasterConfig =
        new ToasterConfig({
            tapToDismiss: true,
            timeout: 5000
        });

    saveEntity(ifEdit:boolean, path:string, entityObject: any): Promise<any>{
        let url = environment.endpoint + path;
        let request = JSON.stringify(entityObject);
        // PUT
        if (ifEdit) {
            return this.http.put(url, request, this.options)
                .toPromise()
                .then(response => {
                    return response;
                })
                .catch(this.handleError);
        }

        // POST
        else{
            return this.http.post(url, request, this.options)
                .toPromise()
                .then(response => {
                    return response;
                })
                .catch(this.handleError);
        }
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }

    public showSuccess(title:string, desc: string) {
        this.toasterService.pop('success', title, desc);
    }

    showPrimary(title:string, desc: string) {
        this.toasterService.pop('primary', title, desc);
    }

    showError(title:string, desc: string) {
        this.toasterService.pop('error', title, desc);
    }

    showWarning(title:string, desc: string) {
        this.toasterService.pop('warning', title, desc);
    }

    showInfo(title:string, desc: string) {
        this.toasterService.pop('info', title, desc);
    }
}


