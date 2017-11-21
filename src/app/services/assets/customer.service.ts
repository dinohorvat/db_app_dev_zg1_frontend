import {Http, Headers, RequestOptions} from '@angular/http';
import {Injectable} from "@angular/core";
import {CustomerModel} from "../../model/customer.model";
import {environment} from "../../../environments/environment";
import 'rxjs/add/operator/toPromise';
import {GlobalService} from "../global.service";
import {EmailModel} from "../../model/email-model";
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

    fetchCustomer(entityId: number): Promise<CustomerModel> {
        let url = environment.endpoint + '/customer/' + entityId;
        return this.http.get(url)
            .toPromise()
            .then(response => {
                return response.json().body as CustomerModel;
            })
            .catch(reason => {
                this.handleError
            });
    }

    searchCustomers(entity: CustomerModel): Promise<CustomerModel[]> {
        let url = environment.endpoint + '/customer/search';
        let request = JSON.stringify(entity);
        return this.http.post(url, request, this.options)
            .toPromise()
            .then(response => {
                return response.json().body as CustomerModel[];
            })
            .catch(reason => {
                this.handleError
            });
    }


    saveCustomer(ifEdit: boolean, entity: CustomerModel): Promise<CustomerModel>{
        return this.globalService.saveEntity(ifEdit, 'customer', entity);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }

    public notifyCustomer(entity: EmailModel){
        let url = environment.endpoint + 'customer/sendMail';
        let request = JSON.stringify(entity);
        return this.http.post(url, request, this.options)
            .toPromise()
            .then(response => {
                if(response.status == 200){
                    this.globalService.showSuccess("Success", "E-mail Notification successfully sent.");
                }
            })
            .catch(reason => {
                this.handleError
            });
    }
}