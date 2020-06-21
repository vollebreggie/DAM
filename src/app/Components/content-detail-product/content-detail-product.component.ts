import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Product } from 'src/app/Models/Product';
import { DAMService } from 'src/app/Services/DAMService';
import { Type } from 'src/app/Models/Enums/Type';
import { environment } from 'src/environments/environment';
import { Category } from 'src/app/Models/Category';
import { ImageProduct } from 'src/app/Models/ImageProduct';

@Component({
  selector: 'content-detail-product',
  templateUrl: './content-detail-product.component.html',
  styleUrls: ['./content-detail-product.component.css']
})
export class ContentDetailProductComponent implements OnInit {
  imageSrc: string;
  file: HTMLInputEvent;
  contentForm: FormGroup;
  @Input() product: Product;
  categories: Category[];
  formData: FormData = null;
  url: string = environment.apiUrl + "images/";
  dirty: boolean = false;
  selectedCategory: Category;
  selectedAvailable: string = "Available";
  images: string[];

  availables: string[] = ["Available", "Not Available"];

  constructor(private formBuilder: FormBuilder, private damService: DAMService) {

    this.damService.current.subscribe(c => {
      if (c != null) {
        switch (c.type) {
          case Type.Product:
            console.log(c);
            this.product = c;
            this.damService.getCategories().subscribe(r => {
              this.categories = r.data;
              if (this.product.category != null) {
                this.selectedCategory = this.categories.find(c => c.id == this.product.category.id);
              } else {
                this.selectedCategory = this.categories[0];
              }
            });

            if (!this.product.images) {
              this.product.images = [];
            }
            this.images = this.product.images.map(i => i.image);
            this.contentForm = this.formBuilder.group({
              title: [this.product.title, Validators.required],
              description: [this.product.description, Validators.required],
              price: [this.product.price, Validators.required]
            });
          
            if(this.product.available) {
              this.selectedAvailable = "Available";
            }else {
              this.selectedAvailable = "Not Available";
            }

            if (c.id == 0) {
              this.contentForm.markAsDirty();
            }
            break;
          default:
            console.log("default");
        }
      }
    });
  }

  ngOnInit() {
    this.contentForm = this.formBuilder.group({
      title: [this.product.title, Validators.required],
      description: [this.product.description, Validators.required],
      price: [this.product.price, Validators.required]
    });
  }

  removeImage(index) {
    if (this.images.length == 1) {
      return;
    }

    (<HTMLElement>document.getElementById('image-' + 0)).classList.add("active");

    this.contentForm.markAsDirty();
    this.images.splice(index, 1);
  }

  readURL(input: HTMLInputEvent): void {
    if (input.target.files && input.target.files[0]) {
      var reader = new FileReader();
      this.dirty = true;
      this.contentForm.markAsDirty();
      this.formData = new FormData();
      this.formData.append('file', input.target.files[0], input.target.files[0].name);
      reader.onload = (e: any) => {
        this.damService.uploadImage(this.formData, "product").subscribe(response => {
          this.images.unshift(response.text);
          this.formData = null;
        });
      };

      reader.readAsDataURL(input.target.files[0]);
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.contentForm.controls; }

  onSubmit() {

    // stop here if form is invalid
    if (this.contentForm.invalid) {
      return;
    }

    this.contentForm.markAsPristine();
    let imageProducts = this.images.map(image => new ImageProduct(image));
    let available = false;

    if(this.selectedAvailable == "Available") {
      available = true;
    }

    let product = new Product(this.product.id, this.f.title.value, this.f.description.value, this.f.price.value, imageProducts, this.selectedCategory, available);

    if (!this.product.images) {
      this.product.images = [];
    }
    this.damService.updateProduct(product).subscribe(response => {
      this.product = response.data;

      this.damService.getProducts().subscribe(responseProducts => {
        this.damService.productsSubject.next(responseProducts.data);
      });
    });

  }

  onChange(category: Category) {
    this.contentForm.markAsDirty();
  }
}



interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}