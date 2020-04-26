import { Component, OnInit, Input } from '@angular/core';
import { DAMService } from 'src/app/Services/DAMService';
import { Product } from 'src/app/Models/Product';

@Component({
  selector: 'content-details',
  templateUrl: './content-details.component.html',
  styleUrls: ['./content-details.component.css']
})
export class ContentDetailsComponent implements OnInit {
  product: Product;

  constructor(private damService: DAMService) {
    this.damService.current.subscribe(c => {
      switch(c){
        case Product:
        this.product = c;
        break;
      }
    });
  }

  ngOnInit() {
    
  }

  onSubmit() {

  }
}
