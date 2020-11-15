import { Component, OnInit } from '@angular/core';
import { DAMService } from 'src/app/Services/DAMService';
import { Product } from 'src/app/Models/Product';
import { environment } from 'src/environments/environment';
import { NavigationService } from 'src/app/Services/NavigationService';
import { Landing } from 'src/app/Models/Landing';
import { Observable, Subject } from 'rxjs';
import { FilterTag } from 'src/app/Models/FilterTag';
import { ProductFilterTagDTO } from 'src/app/Models/ProductFilterTagDTO';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'products-board',
  templateUrl: './products-board.component.html',
  styleUrls: ['./products-board.component.css']
})
export class ProductsBoardComponent implements OnInit {
  headerProducts: Product[];
  products$: Observable<Product[][]>;
  productsBatch: Product[][];
  imageUrl: string = environment.apiUrl + "images/";
  landing: Landing;
  searchTerm$ = new Subject<string>();
  filterTags: ProductFilterTagDTO[][];
  activeTags: ProductFilterTagDTO[] = [];
  latestQ:string = "search=";

  constructor(private damService: DAMService, private navigationService: NavigationService) {
    this.damService.getProducts().subscribe(response => {
      this.productsBatch = response.data;
      this.headerProducts = response.data[0];
      this.damService.logIp("productspage").subscribe();
    });

    this.damService.getFilterTagsBatch(10).subscribe(response => {
      this.filterTags = response.data;
    });

    this.damService.getLanding().subscribe(response => this.landing = response.data);

    this.products$ = this.searchTerm$.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      switchMap(term => {
        this.latestQ = "search=" + term;
        return this.damService.getProductsFromTags("search=" +term, this.activeTags).pipe(map(response => response.data))
      }));

    this.products$.subscribe(r => {
      this.productsBatch = r;
    });
  }

  ngOnInit() {
  }

  selectFilter(tag: ProductFilterTagDTO, i, j) {
    this.filterTags[i][j].active = !this.filterTags[i][j].active;

    if(this.filterTags[i][j].active) {
      this.activeTags.push(this.filterTags[i][j]);
    } else {
      let index = this.activeTags.findIndex(t => t.id == this.filterTags[i][j].id);
      this.activeTags.splice(index, 1);
    }

    this.damService.getProductsFromTags(this.latestQ, this.activeTags).subscribe(response => {
      this.productsBatch = response.data;
    });
  }
}
