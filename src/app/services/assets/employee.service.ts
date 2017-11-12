import {Http, Headers, RequestOptions} from '@angular/http';
import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import 'rxjs/add/operator/toPromise';
import {EmployeeModel} from "../../model/employee.model";
/**
 * Created by dinohorvat on 11/11/2017.
 */
@Injectable()

export class EmployeeService {
    headers = new Headers({'Content-Type': 'application/json'});
    options = new RequestOptions({headers: this.headers});
    inflection = require('inflection');

    constructor(private http: Http) {
    }
    fetchEmployee(entityId: string): Promise<EmployeeModel> {
        let url = environment.endpoint + '/employee/' + entityId;
        return this.http.get(url)
            .toPromise()
            .then(response => {
                return response.json().body as EmployeeModel;
            })
            .catch(this.handleError);
    }
    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}