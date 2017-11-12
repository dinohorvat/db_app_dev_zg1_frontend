import {Http, Headers, RequestOptions} from '@angular/http';
import {Injectable} from "@angular/core";
import {CustomerModel} from "../../model/customer.model";
import {environment} from "../../../environments/environment";
import 'rxjs/add/operator/toPromise';
/**
 * Created by dinohorvat on 11/11/2017.
 */
@Injectable()

export class CustomerService {
    headers = new Headers({'Content-Type': 'application/json'});
    options = new RequestOptions({headers: this.headers});
    inflection = require('inflection');

    constructor(private http: Http) {
    }

    fetchCustomer(entityId: string): Promise<CustomerModel> {
        let url = environment.endpoint + '/customer/' + entityId;
        return this.http.get(url)
            .toPromise()
            .then(response => {
                return response.json().body as CustomerModel;
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}