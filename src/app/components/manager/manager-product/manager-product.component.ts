import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../../services/assets/product.service";
import {ProductModel} from "../../../model/product.model";
import {isNullOrUndefined} from "util";
import {GlobalService} from "../../../services/global.service";
import {$} from "protractor";

@Component({
  selector: 'app-manager-product',
  templateUrl: './manager-product.component.html',
  styleUrls: ['./manager-product.component.scss']
})
export class ManagerProductComponent implements OnInit {

  listProducts: ProductModel[];
  selectedProduct: ProductModel;

  constructor(private productService: ProductService, private globalService: GlobalService) { }

  ngOnInit() {
    this.listProducts = new Array<ProductModel>();
    this.selectedProduct = new ProductModel;
    this.loadProducts();
  }

  private loadProducts(){
    Promise.resolve(this.productService.fetchAllProducts()).then(response =>{
      if(!isNullOrUndefined(response)){
        this.listProducts = response;
      }
    });
  }


  public prepareCreateForm(){
    this.selectedProduct = new ProductModel;
  }
  public showProductDetails(product: ProductModel){
    this.selectedProduct = product;
  }

  public saveProduct(ifEdit: boolean){
    Promise.resolve(this.productService.saveProduct(ifEdit, this.selectedProduct)).then(response =>{
      if(!isNullOrUndefined(response)){
        this.selectedProduct = response;
        if(ifEdit){
          this.globalService.showSuccess("Success", "Product updated successfully.")
        }else {
          this.globalService.showSuccess("Success", "Product creeated successfully.")
          this.listProducts.push(this.selectedProduct);
        }
      }
    });
  }

  public removeProduct(){
      Promise.resolve(this.productService.deleteProduct(this.selectedProduct)).then(response =>{
        let idx = this.listProducts.indexOf(this.selectedProduct);
        this.listProducts.splice(idx,1);
        this.selectedProduct = new ProductModel;
      });
  }

}
