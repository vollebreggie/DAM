import { Component, OnInit } from '@angular/core';
import { DAMService } from 'src/app/Services/DAMService';
import { Product } from 'src/app/Models/Product';
import { environment } from 'src/environments/environment';
import { NavigationService } from 'src/app/Services/NavigationService';
import { Landing } from 'src/app/Models/Landing';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'products-board',
  templateUrl: './products-board.component.html',
  styleUrls: ['./products-board.component.css']
})
export class ProductsBoardComponent implements OnInit {
  headerProducts: Product[];
  products$: Observable<Product[]>;
  products: Product[];
  imageUrl: string = environment.apiUrl + "images/";
  landing: Landing;
  searchTerm$ = new Subject<string>();

  constructor(private damService: DAMService, private navigationService: NavigationService) {
    this.damService.getProducts().subscribe(response => {
      this.products = response.data;
      this.headerProducts = response.data;
    });

    this.damService.getLanding().subscribe(response => this.landing = response.data);

    this.products$ = this.damService.search(this.searchTerm$);
    this.products$.subscribe(r => {
      this.products = r;
    });
  }

  ngOnInit() {
  }

}
