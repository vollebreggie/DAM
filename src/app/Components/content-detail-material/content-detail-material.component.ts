import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DAMService } from 'src/app/Services/DAMService';
import { Material } from 'src/app/Models/Material';
import { environment } from 'src/environments/environment';
import { Type } from 'src/app/Models/Enums/Type';
import { Category } from 'src/app/Models/Category';

@Component({
  selector: 'content-detail-material',
  templateUrl: './content-detail-material.component.html',
  styleUrls: ['./content-detail-material.component.css']
})
export class ContentDetailMaterialComponent implements OnInit {
  imageSrc: string;
  file: HTMLInputEvent;
  contentForm: FormGroup;
  @Input() material: Material;
  formData: FormData = new FormData();
  url: string = environment.apiUrl + "images/";
  dirty: boolean = false;
  categories: Category[];
  selectedCategory: Category;

  constructor(private formBuilder: FormBuilder, private damService: DAMService) {
    this.damService.current.subscribe(c => {
      if (c != null) {
        switch (c.type) {
          case Type.Material:

            this.material = c;

            this.damService.getCategories().subscribe(r =>  {
              this.categories = r.data;
              console.log(this.material);
              if(this.material.category){
                this.selectedCategory = this.categories.find(c => c.id == this.material.category.id);
              } else {
                this.selectedCategory = this.categories[0];
              }
              
            });

            this.imageSrc = this.material.image;
            this.contentForm = this.formBuilder.group({
              name: [this.material.name, Validators.required],
              description: [this.material.description, Validators.required]
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
      name: [this.material.name, Validators.required],
      description: [this.material.description, Validators.required]
    });
  }

  readURL(input: HTMLInputEvent): void {
    if (input.target.files && input.target.files[0]) {
      var reader = new FileReader();
      this.dirty = true;
      this.contentForm.markAsDirty();
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
    let material = new Material(this.material.id, this.f.name.value, this.f.description.value,this.imageSrc, this.selectedCategory);
    if (this.dirty) {

      this.damService.uploadImage(this.formData, "material").subscribe(response => {
        material.image = response.text;
        this.damService.updateMaterial(material).subscribe(response => {
          this.material = response.data;

          this.damService.getMaterials().subscribe(responseMaterials => {
            this.damService.materialsSubject.next(responseMaterials.data);
          });
        });
      });

    } else {

      if (!this.material.image) {
        this.material.image = "example.jpg";
      }
      this.damService.updateMaterial(material).subscribe(response => {
        this.material = response.data;

        this.damService.getMaterials().subscribe(responseMaterials => {
          this.damService.materialsSubject.next(responseMaterials.data);
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