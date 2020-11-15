import { Component, Input, OnInit } from '@angular/core';
import { CartProduct } from 'src/app/Models/CartProduct';
import { Product } from 'src/app/Models/Product';
import { AlertService } from 'src/app/Services/AlertService';
import { DAMService } from 'src/app/Services/DAMService';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'product-thumbnail',
  templateUrl: './product-thumbnail.component.html',
  styleUrls: ['./product-thumbnail.component.css']
})
export class ProductThumbnailComponent implements OnInit {

  @Input() product: Product;
  imageUrl: string = environment.apiUrl + "images/";
  cartProduct: CartProduct;

  constructor(private damService: DAMService, private alertService: AlertService) { }

  ngOnInit() {
  }

  addToCart() {
    this.cartProduct = new CartProduct();
    this.cartProduct.quantity = 1;
    this.cartProduct.product = this.product;
    this.cartProduct.option = this.product.options[0];

    this.damService.addNewProductToCart(this.cartProduct).subscribe(response => {
      if(response.data) {
        this.cartProduct = response.data;
      }
      this.alertService.success("Added to " + this.product.title + " shoppingcard");
    });
  }

  removeFromCart() {
    this.damService.removeAllProductFromCart(this.cartProduct).subscribe(response => {
      this.alertService.success("Removed to " + this.product.title + " shoppingcard");
    });
    this.cartProduct = null;
  }

  addQuantity() {
    this.cartProduct.quantity++;
    this.damService.addProductToCart(this.cartProduct).subscribe();
  }

  removeQuantity() {
    this.cartProduct.quantity--;
    this.damService.removeProductFromCart(this.cartProduct).subscribe();
    if(this.cartProduct.quantity == 0){
      this.cartProduct = null;
    }
    
  }
}
