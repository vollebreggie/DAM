import { Component, OnInit } from '@angular/core';
import { DAMService } from 'src/app/Services/DAMService';
import { Product } from 'src/app/Models/Product';
import { environment } from 'src/environments/environment';
import { NavigationService } from 'src/app/Services/NavigationService';
import { Landing } from 'src/app/Models/Landing';

@Component({
  selector: 'products-board',
  templateUrl: './products-board.component.html',
  styleUrls: ['./products-board.component.css']
})
export class ProductsBoardComponent implements OnInit {

  products: Product[];
  imageUrl: string = environment.apiUrl + "images/";
  landing: Landing;
  
  constructor(private damService: DAMService, private navigationService: NavigationService) {
    this.damService.getProducts().subscribe(response => this.products = response.data);
    this.damService.getLanding().subscribe(response => this.landing = response.data);
  }

  ngOnInit() {
  }

}
