import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Landing } from 'src/app/Models/Landing';
import { environment } from 'src/environments/environment';
import { DAMService } from 'src/app/Services/DAMService';
import { Type } from 'src/app/Models/Enums/Type';
import { ModalService } from 'src/app/Services/ModalService';
import { Product } from 'src/app/Models/Product';

@Component({
  selector: 'content-detail-landing',
  templateUrl: './content-detail-landing.component.html',
  styleUrls: ['./content-detail-landing.component.css']
})
export class ContentDetailLandingComponent implements OnInit {
  imageSrc: string;
  file: HTMLInputEvent;
  contentForm: FormGroup;

  @Input() landing: Landing;
  formData: FormData = new FormData();

  url: string = environment.apiUrl + "images/";
  bodyText: string;
  selectedProduct: Product;
  selectedPosition: number;
  products: Product[];
  dirty: boolean = false;

  constructor(private formBuilder: FormBuilder, private damService: DAMService, private modalService: ModalService) {
    this.damService.current.subscribe(c => {
      if (c != null) {
        switch (c.type) {
          case Type.Landing:
            this.landing = c;

            this.imageSrc = this.landing.profilePicture;
            this.contentForm = this.formBuilder.group({
              firstName: [this.landing.firstName, Validators.required],
              firstTitle: [this.landing.firstTitle, Validators.required],
              secondName: [this.landing.secondName, Validators.required],
              secondTitle: [this.landing.secondTitle, Validators.required]
            });
            break;
          default:
            console.log("default");
        }
      }
    });

    this.damService.getProducts().subscribe(p => {

      this.products = p.data;
    });
  }

  ngOnInit() {
    this.contentForm = this.formBuilder.group({
      firstName: [this.landing.firstName, Validators.required],
      firstTitle: [this.landing.firstTitle, Validators.required],
      secondName: [this.landing.secondName, Validators.required],
      secondTitle: [this.landing.secondTitle, Validators.required]
    });
  }

  readURL(input: HTMLInputEvent): void {
    if (input.target.files && input.target.files[0]) {
      var reader = new FileReader();
      this.dirty = true;

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

    if (this.contentForm.invalid) {
      return;
    }
    
    this.contentForm.markAsPristine();
    let landing = new Landing(this.landing.id, this.f.firstName.value, this.f.secondName.value, this.f.firstTitle.value, this.f.secondTitle.value, this.imageSrc);
    if (this.dirty) {
      this.damService.uploadImage(this.formData, "landing").subscribe(response => {
        landing.profilePicture = response.text;
        this.damService.updateLanding(landing).subscribe(response => this.landing = response.data);
      });
    } else {
      this.damService.updateLanding(landing).subscribe();
    }
  }

  openModal(id: string, product: Product, position: number) {
    this.selectedProduct = product;
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  save() {
    this.dirty = false;
    this.products.splice(this.products.findIndex(p => p.id == this.selectedProduct.id), 1);
    this.products.splice(this.selectedPosition, 0, this.selectedProduct);
    this.damService.updateLandingProductPlaces(this.products).subscribe(response => this.damService.productsSubject.next(response.data));
  }

  onChange(product: Product) {
    this.dirty = true;
    (<HTMLImageElement>document.getElementById('landing-selected')).src = this.url + this.selectedProduct.image;
  }
}



interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}