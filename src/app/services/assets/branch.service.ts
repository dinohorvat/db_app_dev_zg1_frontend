import {Http, Headers, RequestOptions} from '@angular/http';
import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import 'rxjs/add/operator/toPromise';
import {BranchModel} from "../../model/branch.model";
import {HstBranch} from "../../model/hst/branch-hst";
/**
 * Created by dinohorvat on 11/11/2017.
 */
@Injectable()

export class BranchService {
    headers = new Headers({'Content-Type': 'application/json'});
    options = new RequestOptions({headers: this.headers});
    inflection = require('inflection');

    hstBrnach: HstBranch[];


    constructor(private http: Http) {
    }

    fetchBranch(entityId: number): Promise<BranchModel> {
        let url = environment.endpoint + '/branch/' + entityId;
        return this.http.get(url)
            .toPromise()
            .then(response => {
                return response.json().body as BranchModel;
            })
            .catch(this.handleError);
    }
    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }

}