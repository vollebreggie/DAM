import { Component, OnInit } from '@angular/core';
import { DAMService } from 'src/app/Services/DAMService';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/Models/Product';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  imageUrl: string = environment.apiUrl + "images/";
  product: Product;
  
  constructor(private route: ActivatedRoute, private damService: DAMService) { 
    const id = +this.route.snapshot.paramMap.get('id');
    this.damService.getProduct(id).subscribe(r => this.product = r.data);
  }

  ngOnInit() {
  }

}
