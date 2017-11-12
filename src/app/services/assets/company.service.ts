import {Http, Headers, RequestOptions} from '@angular/http';
import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import 'rxjs/add/operator/toPromise';
import {CompanyModel} from "../../model/company.model";
/**
 * Created by dinohorvat on 11/11/2017.
 */
@Injectable()

export class CompanyService {
    headers = new Headers({'Content-Type': 'application/json'});
    options = new RequestOptions({headers: this.headers});
    inflection = require('inflection');

    constructor(private http: Http) {
    }

    fetchCurrency(entityId: string): Promise<CompanyModel> {
        let url = environment.endpoint + '/company/' + entityId;
        return this.http.get(url)
            .toPromise()
            .then(response => {
                return response.json().body as CompanyModel;
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}