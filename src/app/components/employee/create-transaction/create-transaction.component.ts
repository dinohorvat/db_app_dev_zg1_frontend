import { Component, OnInit } from '@angular/core';
import {CustomerModel} from "../../../model/customer.model";
import {isNullOrUndefined} from "util";
import {CustomerService} from "../../../services/assets/customer.service";
import {GlobalService} from "../../../services/global.service";
import {ProductModel} from "../../../model/product.model";
import {TransactionsModel} from "../../../model/transactions.model";
import {ProductService} from "../../../services/assets/product.service";
import {BranchModel} from "../../../model/branch.model";
import {CompanyModel} from "../../../model/company.model";
import {BranchService} from "../../../services/assets/branch.service";
import {CompanyService} from "../../../services/assets/company.service";
import {EmployeeModel} from "../../../model/employee.model";
import {EmployeeService} from "../../../services/assets/employee.service";
import {RewardPolicy} from "../../../model/reward-policy";
import {TransactionItem} from "../../../model/transaction-item";
import {RewardPointsModel} from "../../../model/reward-points.model";
import {TransactionsService} from "../../../services/assets/transactions.service";
import {EmailModel} from "../../../model/email-model";
import {KeyCloakService} from "../../../services/keycloak/keycloak.service";

@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.scss']
})
export class CreateTransactionComponent implements OnInit {

  secondaryLoadBlock: boolean = false;
  showHiddenStep:boolean = false;
  isCompleted: boolean = false;
  isStep1Valid: boolean = false;
  showSearchResults: boolean = false;

  private customerPoints = 0;

  private employee: EmployeeModel;

  private allProducts: ProductModel[];

  private searchCustomer: CustomerModel;
  private customerSearchResults: CustomerModel[];
  private selectedCustomer: CustomerModel;

  private productList: ProductModel[];
  private appliedPoliciesList: RewardPolicy[];

  private tempTransactionProduct: ProductModel;
  private tempRewardsObject: RewardPolicy;
  private tempOriginalPrice = 0;
  private tempEarnedCustomerPoints = 0;

  private transaction: TransactionsModel;

  private employeeBranch: BranchModel;
  private employeeCompany: CompanyModel;


  constructor(private customerService: CustomerService, private globalService: GlobalService,
              private productService: ProductService, private employeeService: EmployeeService,
              private branchService: BranchService, private companyService: CompanyService,
              private transactionService: TransactionsService, private keycloakService: KeyCloakService) { }


  ngOnInit() {
    this.employee = new EmployeeModel;

    this.loadEmployeeInfo();

    this.appliedPoliciesList = new Array<RewardPolicy>();

    this.employeeCompany = new CompanyModel;
    this.employeeBranch = new BranchModel;
    this.tempRewardsObject = new RewardPolicy;
    this.tempTransactionProduct = new ProductModel;

    this.allProducts = new Array<ProductModel>();

    this.transaction = new TransactionsModel;
    this.selectedCustomer = new CustomerModel;
    this.searchCustomer = new CustomerModel;
    this.customerSearchResults = new Array<CustomerModel>();
    this.productList = new Array<ProductModel>();

    this.fetchAllProducts()
  }

  private fetchAllProducts(){
    Promise.resolve(this.productService.fetchAllProducts()).then(resource =>{
      this.allProducts = resource;
    });
  }


  resetSearch(){
    this.showSearchResults = false;
    this.searchCustomer = new CustomerModel;
    this.selectedCustomer = new CustomerModel;
    this.customerSearchResults = new Array<CustomerModel>();
    this.isStep1Valid = false;
  }

  public searchCustomers(){
    this.secondaryLoadBlock = true;

    if(!isNullOrUndefined(this.searchCustomer.id)){
      Promise.resolve(this.customerService.fetchCustomer(this.searchCustomer.id)).then(resource =>{
        if(!isNullOrUndefined(resource)){
          this.customerSearchResults = new Array<CustomerModel>();
          this.customerSearchResults.push(resource);
          this.showSearchResults = true;

          this.secondaryLoadBlock = false;
        }else {
          Promise.resolve(this.customerService.searchCustomers(this.searchCustomer)).then(resource =>{
            if(!isNullOrUndefined(resource)){
              this.customerSearchResults = resource;
              this.showSearchResults = true;
            }else {
              this.globalService.showWarning("Not Found", "No results found.");
            }

            this.secondaryLoadBlock = false;
          });
        }
      });
    }else {
      if(!isNullOrUndefined(this.searchCustomer.email) || !isNullOrUndefined(this.searchCustomer.firstname)
           || !isNullOrUndefined(this.searchCustomer.lastname)){

        Promise.resolve(this.customerService.searchCustomers(this.searchCustomer)).then(resource =>{
          if(!isNullOrUndefined(resource)){
            this.customerSearchResults = resource;
            this.showSearchResults = true;
          }else {
            this.globalService.showWarning("Not Found", "No results found.");
          }

          this.secondaryLoadBlock = false;
        });
      }else {
        this.secondaryLoadBlock = false;
        this.globalService.showError("No search condition","Please enter search condition");
      }
    }
  }

  public setSelectedCustomer(customer: CustomerModel){
    if(!isNullOrUndefined(customer)){
      this.selectedCustomer = customer;
      this.globalService.showSuccess("Success", `Customer ${customer.firstname} ${customer.lastname} has been selected`);
      this.isStep1Valid = true;
    }
  }


  public removeProductItem(item: ProductModel){
    let idx = this.productList.indexOf(item);
    this.productList.splice(idx,1);

    if(this.transaction.totalPrice > 0){
      this.transaction.totalPrice -= item.price;
      this.tempOriginalPrice -= item.price;
    }
  }

  public addProductItem(){
    this.productList.push(this.tempTransactionProduct);
    this.transaction.totalPrice += this.tempTransactionProduct.price;
    this.tempOriginalPrice += this.tempTransactionProduct.price;
    this.tempTransactionProduct = new ProductModel;
  }

  private loadEmployeeInfo(){
    var localEmployee: EmployeeModel = new EmployeeModel;
    localEmployee.username = this.keycloakService.getUser().username;
    Promise.resolve(this.employeeService.findEmployeeByUsername(localEmployee)).then(response => {
      if(!isNullOrUndefined(response)){
        this.employee = response;
        this.fetchCompanyPolicies(this.employee.branch.id);
      }else {
        console.log("Error : " + this.keycloakService.getUser().username );
        console.log("Usr Obj : " + this.keycloakService.getUser() );
      }

    });
  }

  private fetchCompanyPolicies(branchId: number){
    Promise.resolve(this.branchService.fetchBranch(branchId)).then(response =>{
      this.employeeBranch = response;
      Promise.resolve(this.companyService.fetchCompany(response.company.id)).then(response =>{
        this.employeeCompany = response;
        console.log(this.employeeCompany);
      });
    });
  }

  private calculateEarnedPoints(){
    this.tempEarnedCustomerPoints = Math.ceil(this.tempOriginalPrice / this.employeeCompany.pointExchangeRate);
  }

  private calculateTotalPointsOfCustomer(){
    this.customerPoints = 0;
    for(let points of this.selectedCustomer.rewardPoints){
      this.customerPoints += points.amount;
    }
  }

  public applyPolicy(){

    if(this.transaction.totalPrice > 0){
      if(this.customerPoints < this.tempRewardsObject.numPoints){
        this.globalService.showError("Sorry", "Customer does not have enough points.")
      }else {
        this.appliedPoliciesList.push(this.tempRewardsObject);
        this.customerPoints -= this.tempRewardsObject.numPoints;

        if(this.transaction.totalPrice < this.tempRewardsObject.amountReduced){
          this.transaction.totalPrice = 0;
        }else {
          this.transaction.totalPrice -= this.tempRewardsObject.amountReduced;
        }
        this.tempRewardsObject = new RewardPolicy;
      }
    }else {
      this.globalService.showError("Sorry", "Price is already zero.")
    }

  }

  public removeDeduction(deduction: RewardPolicy){
    let idx = this.appliedPoliciesList.indexOf(deduction);
    this.appliedPoliciesList.splice(idx,1);

    this.customerPoints += deduction.numPoints;
    this.transaction.totalPrice += deduction.amountReduced;
  }

  private saveTransaction(){
    this.transaction.status = "SUBMITTED";
    this.transaction.employee = this.employee;
    this.transaction.branch = this.employeeBranch;


    for(let i=0; i<this.productList.length; i++){
      let transactionItem = new TransactionItem;
      transactionItem.customer = this.selectedCustomer;
      transactionItem.product = this.productList[i];
      this.transaction.transactionItems.push(transactionItem);
    }

    Promise.resolve(this.transactionService.saveTransactions(false, this.transaction)).then(response =>{

      if(!isNullOrUndefined(response)){
          this.transaction = response;
          let totalNegativePoints = 0;
          for(let policy of this.appliedPoliciesList){
            totalNegativePoints += policy.numPoints
          }

          totalNegativePoints*=-1;
          var negativeReward: RewardPointsModel = new RewardPointsModel;
          negativeReward.amount = totalNegativePoints;

          var earnedPoints: RewardPointsModel = new RewardPointsModel;
          earnedPoints.amount = this.tempEarnedCustomerPoints;

          if(negativeReward.amount != 0){
            this.selectedCustomer.rewardPoints.push(negativeReward);
          }
          if(earnedPoints.amount != 0){
            this.selectedCustomer.rewardPoints.push(earnedPoints);
          }


          Promise.resolve(this.globalService.saveEntity(true, 'customer', this.selectedCustomer)).then(response2 => {
            if(!isNullOrUndefined(response)){
              this.globalService.showSuccess("Success", "Transaction saved successfully.");

              var emailModel:EmailModel = new EmailModel(this.selectedCustomer.email, "Automated Message",
                  `Thank you on your order. Your transaction has been successfully recorded. 
                  \nTransaction Number: ${this.transaction.id}
                  \nTotal amount: ${this.transaction.totalPrice}${this.employeeCompany.currency.abbreviation}
                  \nExpected time of completion: ${this.transaction.dcsDate.transactionExpCompleted}
                  \nPoints earned: ${this.tempEarnedCustomerPoints}
                  \nTotal amount of points: ${this.customerPoints}`);
              this.customerService.notifyCustomer(emailModel);
            }
          });
      }
    });
  }

  showHidden(){
    if(!this.showHiddenStep){
      this.showHiddenStep = true;
    }else {
      this.showHiddenStep = false;
    }
  }
  public onStep1Next(event){

  }

  public onStep2Next(event){
    this.calculateTotalPointsOfCustomer();
    this.calculateEarnedPoints();
  }

  public onComplete(event){
    this.isCompleted = true;

    this.saveTransaction();

  }
}
