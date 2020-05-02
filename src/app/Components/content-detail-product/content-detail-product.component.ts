import { Component, OnInit, Input } from '@angular/core';
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

  constructor(private formBuilder: FormBuilder, private damService: DAMService) {

    this.damService.current.subscribe(c => {
      if (c != null) {
        switch (c.type) {
          case Type.Product:

            this.product = c;
            this.damService.getCategories().subscribe(r => {
              this.categories = r.data;
              if (this.product.category != null) {
                this.selectedCategory = this.categories.find(c => c.id == this.product.category.id);
              } else {
                this.selectedCategory = this.categories[0];
              }
            });
            
            this.imageSrc = this.product.image;
            this.contentForm = this.formBuilder.group({
              title: [this.product.title, Validators.required],
              description: [this.product.description, Validators.required],
              price: [this.product.price, Validators.required]
            });

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

  readURL(input: HTMLInputEvent): void {
    if (input.target.files && input.target.files[0]) {
      var reader = new FileReader();
      this.dirty = true;
      this.contentForm.markAsDirty();
      this.formData = new FormData();
      this.formData.append('file', input.target.files[0], input.target.files[0].name);
      reader.onload = (e: any) => {
        (<HTMLImageElement>document.getElementById('input-image')).src = e.target.result
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
    let product = new Product(this.product.id, this.f.title.value, this.f.description.value, this.f.price.value, this.imageSrc, this.selectedCategory);
    if (this.dirty && this.formData != null) {
      this.damService.uploadImage(this.formData, "product").subscribe(response => {
        
        let imageProduct: ImageProduct = {
          id: 0,
          title: "image",
          image: response.text
        };

        this.formData = null;
        product.images.push(imageProduct);
        this.damService.updateProduct(product).subscribe(response => {
          this.product = response.data;

          this.damService.getProducts().subscribe(responseProducts => {
            this.damService.productsSubject.next(responseProducts.data);
          });
        });
      });
    } else {
      if (!this.product.image) {
        this.product.image = "example.jpg";
      }
      this.damService.updateProduct(product).subscribe(response => {
        this.product = response.data;

        this.damService.getProducts().subscribe(responseProducts => {
          this.damService.productsSubject.next(responseProducts.data);
        });
      });
    }
  }

  onChange(category: Category) {
    this.contentForm.markAsDirty();
  }
}



interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}