import { Component, OnInit } from '@angular/core';
import { DAMService } from 'src/app/Services/DAMService';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/Models/Product';
import { environment } from 'src/environments/environment';
import { Option } from 'src/app/Models/Option';
import { Material } from 'src/app/Models/Material';
import { Dimension } from 'src/app/Models/Dimension';
import { OptionDTO } from 'src/app/Models/OptionDTO';
import { CartProduct } from 'src/app/Models/CartProduct';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  imageUrl: string = environment.apiUrl + "images/";
  product: Product;

  woodMaterials: Material[] = [];
  stoneMaterials: Material[] = [];
  ironMaterials: Material[] = [];
  dimensions: Dimension[] = [];
  options: OptionDTO[] = [];
  url: string = environment.apiUrl + "images/";
  selectedWood: Material;
  selectedStone: Material;
  selectedIron: Material;
  selectedDimension: Dimension;
  selectedOption: OptionDTO;
  price: number;
  cartProduct: CartProduct;

  constructor(private route: ActivatedRoute, private damService: DAMService) {
    const id = +this.route.snapshot.paramMap.get('id');
    this.damService.getProduct(id).subscribe(r => {
      this.product = r.data;
      

      this.damService.getProductOptions(this.product.id).subscribe(response => {
        this.options = response.data;

        if (this.options.length > 0) {
          this.selectedOption = this.options[0];
          this.price = this.options[0].price;
          this.selectedStone = this.options[0].materialStone;
          this.selectedIron = this.options[0].materialIron;
          this.selectedWood = this.options[0].materialWood;
          let dimension: Dimension = { height: this.options[0].height, width: this.options[0].width, length: this.options[0].length, id: 0 };
          this.selectedDimension = dimension;
        } else {
          this.price = 0;
        }

        let wood = [];
        let stone = [];
        let iron = [];
        let dimensions = [];

        response.data.forEach((option) => {
          if (option.materialWood) {
            wood.push(option.materialWood);
          }

          if (option.materialStone) {
            stone.push(option.materialStone);
          }

          if (option.materialIron) {
            iron.push(option.materialIron);
          }


          let dimension: Dimension = { id: 0, height: option.height, width: option.width, length: option.length };
          dimensions.push(dimension);
        });

        

        let uniqueWood = this.getUnique(wood);
        let uniqueStone = this.getUnique(stone);
        let uniqueIron = this.getUnique(iron);
        let uniqueDimension = this.getUniqueDimensions(dimensions);

        this.woodMaterials = uniqueWood;
        this.stoneMaterials = uniqueStone;
        this.ironMaterials = uniqueIron;
        this.dimensions = uniqueDimension;
        if (this.dimensions.length > 0) {
          this.selectedDimension = this.dimensions[0];
        }

      });
    });

    this.damService.logIp("product detail " + id + "page").subscribe();
  }

  ngOnInit() {
  }

  selectWood(wood: Material) {
    this.selectedWood = wood;
    this.setProperOption();
  }

  selectStone(stone: Material) {
    this.selectedStone = stone;
    this.setProperOption();
  }

  ironStone(iron: Material) {
    this.selectedIron = iron;
    this.setProperOption();
  }

  onChange(dimension: Dimension) {
    this.setProperOption();
  }

  setProperOption() {
    let option = this.options.find(o =>
      o.height == this.selectedDimension.height
      && o.width == this.selectedDimension.width
      && o.length == this.selectedDimension.length
      && (o.materialIron == null || o.materialIron.id == this.selectedIron.id)
      && (o.materialStone == null || o.materialStone.id == this.selectedStone.id)
      && (o.materialWood == null || o.materialWood.id == this.selectedWood.id));

    this.selectedOption = option;
    this.price = option.price;
  }

  getUnique(array) {
    var unique = [];
    var distinct = [];
    for (let i = 0; i < array.length; i++) {
      if (!unique[array[i].id]) {
        distinct.push(array[i]);
        unique[array[i].id] = 1;
      }
    }

    return distinct;
  }

  getUniqueDimensions(array) {
    var unique = [];
    var distinct = [];
    for (let i = 0; i < array.length; i++) {
      if (!unique[array[i].height + "-" + array[i].width+ "-" + array[i].length] ) {
        distinct.push(array[i]);
        unique[array[i].height + "-" + array[i].width+ "-" + array[i].length] = 1;
      }
    }

    return distinct;
  }

}
