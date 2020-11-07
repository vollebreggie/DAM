import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartProduct } from 'src/app/Models/CartProduct';
import { Product } from 'src/app/Models/Product';
import { DAMService } from 'src/app/Services/DAMService';
import { StripeToken, StripeSource } from "stripe-angular"

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
    });
  }
  ngOnInit(): void {
  }
    
  //   // Create an instance of Elements.
  //   var elements = this.stripeService.elements();

  //   // Custom styling can be passed to options when creating an Element.
  //   // (Note that this demo uses a wider set of styles than the guide below.)
  //   var style = {
  //     base: {
  //       padding: '10px 12px',
  //       color: '#32325d',
  //       fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  //       fontSmoothing: 'antialiased',
  //       fontSize: '16px',
  //       '::placeholder': {
  //         color: '#aab7c4'
  //       },
  //     },
  //     invalid: {
  //       color: '#fa755a',
  //     }
  //   };

  //   // Create an instance of the idealBank Element.
  //   var idealBank = elements.create('idealBank', { style: style });

  //   // Add an instance of the idealBank Element into the `ideal-bank-element` <div>.
  //   idealBank.mount('#ideal-bank-element');
  // }

  // ngOnInit(): void {
    
  // }

 
  getTotal() {
    let total = 0;

    this.cartProducts.forEach((cartProduct) => {
      total += cartProduct.product.price * cartProduct.quantity;
    });

    return total;
  }


}
