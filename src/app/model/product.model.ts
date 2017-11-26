import {HstProduct} from "./hst/product-hst";
/**
 * Created by dinohorvat on 12/11/2017.
 */
export class ProductModel {
    id: number;
    name: string;
    description: string;
    price: number;
    hstProducts: HstProduct[] = new Array<HstProduct>();
}
