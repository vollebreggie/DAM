import { Component, Input, OnInit } from '@angular/core';
import { CartProduct } from 'src/app/Models/CartProduct';
import { Product } from 'src/app/Models/Product';
import { AlertService } from 'src/app/Services/AlertService';
import { DAMService } from 'src/app/Services/DAMService';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'product-cart-thumbnail',
  templateUrl: './product-cart-thumbnail.component.html',
  styleUrls: ['./product-cart-thumbnail.component.css']
})
export class ProductCartThumbnailComponent implements OnInit {
  
  @Input() cartProduct: CartProduct;
  imageUrl: string = environment.apiUrl + "images/";
  
  constructor(private damService: DAMService, private alertService: AlertService) { }

  ngOnInit() {
  }

  removeFromCart() {
    this.damService.removeAllProductFromCart(this.cartProduct).subscribe(response => {
      this.alertService.success("Removed to " + this.cartProduct.product.title + " shoppingcard");
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
