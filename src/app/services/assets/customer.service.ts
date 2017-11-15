import {Http, Headers, RequestOptions} from '@angular/http';
import {Injectable} from "@angular/core";
import {CustomerModel} from "../../model/customer.model";
import {environment} from "../../../environments/environment";
import 'rxjs/add/operator/toPromise';
import {GlobalService} from "../global.service";
/**
 * Created by dinohorvat on 11/11/2017.
 */
@Injectable()

export class CustomerService {
    headers = new Headers({'Content-Type': 'application/json'});
    options = new RequestOptions({headers: this.headers});
    inflection = require('inflection');

    constructor(private http: Http, private globalService: GlobalService) {
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


    saveCustomer(ifEdit: boolean, entity: CustomerModel): Promise<CustomerModel>{
        return this.globalService.saveEntity(ifEdit, 'customer', entity);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}