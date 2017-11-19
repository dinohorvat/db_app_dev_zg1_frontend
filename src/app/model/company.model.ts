import {CurrencyModel} from "./currency.model";
import {LocationModel} from "./location.model";
import {BranchModel} from "./branch.model";
import {RewardPointsModel} from "./reward-points.model";
import {RewardPolicy} from "./reward-policy";
/**
 * Created by dinohorvat on 12/11/2017.
 */
export class CompanyModel {
    id: number;
    name: string;
    description: string;
    currency: CurrencyModel = new CurrencyModel;
    pointExchangeRate: number;
    hqLocation: LocationModel;
    hstCompanies: any;
    branches: BranchModel[];
    policies: RewardPolicy[] = new Array<RewardPolicy>();
}
