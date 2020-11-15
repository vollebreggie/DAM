import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartProduct } from 'src/app/Models/CartProduct';
import { Product } from 'src/app/Models/Product';
import { DAMService } from 'src/app/Services/DAMService';
import { loadStripe, StripeCardElement } from '@stripe/stripe-js';

@Component({
  selector: 'stripe',
  templateUrl: './stripe.component.html',
  styleUrls: ['./stripe.component.css']
})
export class StripeComponent implements OnInit {

  title = 'angular-stripe';
  priceId = 'price_1HSxpTFHabj9XRH6DMA8pC7l';
  product = {
    title: 'Classic Peace Lily',
    subTitle: 'Popular House Plant',
    description: 'Classic Peace Lily is a spathiphyllum floor plant arranged in a bamboo planter with a blue & red ribbom and butterfly pick.',
    price: 18.00
  };
  quantity = 1;
  stripe: Stripe;
  idealElement;

  constructor(
    private damService: DAMService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef) {


    loadStripe("pk_test_51Hj4MaIuJJsbx4ge9hVsIQFMLNc4jRBPA59uivZIONAvDCzaA29UEhIhcC87nNGDBSKAdLpoWoeFAQFK7QCD41zp00aDwVRui6").then((stripe) => {
      console.log("stripe loaded");
      this.stripe = stripe;
      var elements = stripe.elements();
      //var cardElement = elements.getElement('card');
      var cardElement = elements.create('card');
      //cardElement.mount('#card-element');

      //var cardElement = elements.getElement('idealBank');
      this.idealElement = elements.create('idealBank');
      this.idealElement.mount('#card-element');

     // stripe.createPaymentMethod()

    })
  }


  pay() {
    this.damService.getClientSecret().subscribe(response => {

      
      this.stripe
        .confirmIdealPayment(response.data.client_secret, {
          payment_method: {
            ideal: {
              bank: 'rabobank',
            },
            billing_details: {
              name: 'Jenny Rosen',
            },
          },
          return_url: 'http://localhost:4200/confirmed-payment',
        })
        .then(function (result) {
          console.log(result);
        });

        
    })
  }

  ngOnInit(): void {
  }


}