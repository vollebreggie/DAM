import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartProduct } from 'src/app/Models/CartProduct';
import { Product } from 'src/app/Models/Product';
import { DAMService } from 'src/app/Services/DAMService';

@Component({
  selector: 'app-shopping-board',
  templateUrl: './shopping-board.component.html',
  styleUrls: ['./shopping-board.component.css']
})
export class ShoppingBoardComponent implements OnInit {

  cartProducts: CartProduct[] = [];

  constructor(
    private damService: DAMService, 
    private fb: FormBuilder,
    private cd: ChangeDetectorRef) {
    this.damService.logIp("shopping-cart-page").subscribe();
    this.damService.cart$.subscribe(response => {
      this.cartProducts = response;
      console.log(this.cartProducts);
    });
  }
  ngOnInit(): void {
  }
 

 
  getTotal() {
    let total = 0;

    this.cartProducts.forEach((cartProduct) => {
      total += cartProduct.product.price * cartProduct.quantity;
    });

    return total;
  }


}
