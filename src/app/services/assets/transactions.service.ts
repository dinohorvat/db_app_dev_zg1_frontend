import {Http, Headers, RequestOptions} from '@angular/http';
import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import 'rxjs/add/operator/toPromise';
import {TransactionsModel} from "../../model/transactions.model";
import {GlobalService} from "../global.service";
/**
 * Created by dinohorvat on 11/11/2017.
 */
@Injectable()

export class TransactionsService {
    headers = new Headers({'Content-Type': 'application/json'});
    options = new RequestOptions({headers: this.headers});
    inflection = require('inflection');
    transactionStatus = ['badge badge-success', 'badge badge-danger', 'badge badge-warning', 'badge badge-primary'];

    constructor(private http: Http, private globalService: GlobalService) {
    }

    fetchTransactions(entityId: number): Promise<TransactionsModel> {
        let url = environment.endpoint + '/transactions/' + entityId;
        return this.http.get(url)
            .toPromise()
            .then(response => {
                return response.json().body as TransactionsModel;
            })
            .catch(this.handleError);
    }

    saveTransactions(ifEdit: boolean, entity): Promise<TransactionsModel>{
        return this.globalService.saveEntity(ifEdit, 'transactions', entity).then(response =>{
            return response.json().body as TransactionsModel;
        });
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }

    public checkStatus(status: string): string{
        if(status == 'SUBMITTED'){
            return this.transactionStatus[2];
        }
        else if(status =='IN_PROGRESS'){
            return this.transactionStatus[3];
        }
        else if(status =='CANCELED'){
            return this.transactionStatus[1];
        }
        else if(status =='COMPLETED'){
            return this.transactionStatus[0];
        }
    }
}