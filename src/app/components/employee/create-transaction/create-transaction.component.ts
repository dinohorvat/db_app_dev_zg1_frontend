import { Component, OnInit } from '@angular/core';
import {CustomerModel} from "../../../model/customer.model";
import {isNullOrUndefined} from "util";
import {CustomerService} from "../../../services/assets/customer.service";
import {GlobalService} from "../../../services/global.service";
import {ProductModel} from "../../../model/product.model";
import {TransactionsModel} from "../../../model/transactions.model";
import {ProductService} from "../../../services/assets/product.service";
import {resource} from "selenium-webdriver/http";

@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.scss']
})
export class CreateTransactionComponent implements OnInit {

  hiddenStep:boolean = true;
  isCompleted: boolean = false;
  isStep1Valid: boolean = false;
  showSearchResults: boolean = false;

  private allProducts: ProductModel[];

  private searchCustomer: CustomerModel;
  private customerSearchResults: CustomerModel[];
  private selectedCustomer: CustomerModel;
  private productList: ProductModel[];

  private transaction: TransactionsModel;


  constructor(private customerService: CustomerService, private globalService: GlobalService, private productService: ProductService) { }


  ngOnInit() {
    this.allProducts = new Array<ProductModel>();
    this.transaction = new TransactionsModel;
    this.searchCustomer = new CustomerModel;
    this.customerSearchResults = new Array<CustomerModel>();
    this.productList = new Array<ProductModel>();

    this.fetchAllProducts()
  }

  private fetchAllProducts(){
    Promise.resolve(this.productService.fetchAllProducts()).then(resource =>{
      this.allProducts = resource;
      console.log("Tu");
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
    Promise.resolve(this.customerService.fetchCustomer(this.searchCustomer.id)).then(resource =>{
      if(!isNullOrUndefined(resource)){
        this.customerSearchResults = new Array<CustomerModel>();
        this.customerSearchResults.push(resource);
        this.globalService.showSuccess("Success", "Results found.");
        this.showSearchResults = true;
      }else {
        this.globalService.showWarning("Not Found", "No results found.");
      }
    });
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
    }
  }

  public addProductItem(){
    this.productList.push(new ProductModel);
  }





  showHidden(){
    if(this.hiddenStep){
      this.hiddenStep = false;
    }else {
      this.hiddenStep = true;
    }
  }
  public onStep1Next(event){
    console.log("bla")
  }

  public onComplete(event){
    this.isCompleted = true;
  }
}
