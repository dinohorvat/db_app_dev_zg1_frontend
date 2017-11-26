import {Http, Headers, RequestOptions} from '@angular/http';
import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import 'rxjs/add/operator/toPromise';
import {ProductModel} from "../../model/product.model";
import {GlobalService} from "../global.service";
import {isNullOrUndefined} from "util";
/**
 * Created by dinohorvat on 11/11/2017.
 */
@Injectable()

export class ProductService {
    headers = new Headers({'Content-Type': 'application/json'});
    options = new RequestOptions({headers: this.headers});
    inflection = require('inflection');

    constructor(private http: Http, private globalService: GlobalService) {
    }

    fetchProduct(entityId: string): Promise<ProductModel> {
        let url = environment.endpoint + '/product/' + entityId;
        return this.http.get(url)
            .toPromise()
            .then(response => {
                return response.json().body as ProductModel;
            })
            .catch(this.handleError);
    }

    fetchAllProducts(): Promise<ProductModel[]> {
        let url = environment.endpoint + '/product/';
        return this.http.get(url)
            .toPromise()
            .then(response => {
                return response.json().body as ProductModel[];
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }

    saveProduct(ifEdit: boolean, entity: ProductModel): Promise<ProductModel>{
        return this.globalService.saveEntity(ifEdit, 'product', entity).then(response =>{
            if(!isNullOrUndefined(response)){
                return response.json().body as ProductModel;
            }
        });
    }

    deleteProduct(entity: ProductModel){
        let url = environment.endpoint + '/product/' + entity.id;

        this.http.delete(url).toPromise().then(response => {
            if(!isNullOrUndefined(response)){
               if(response.status == 200){
                   this.globalService.showSuccess("Success", "Product deleted successfully.")
               }
            }

        }).catch(this.handleError);
    }
}