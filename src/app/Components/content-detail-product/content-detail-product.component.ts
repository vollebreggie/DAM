import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Product } from 'src/app/Models/Product';
import { DAMService } from 'src/app/Services/DAMService';
import { Type } from 'src/app/Models/Enums/Type';
import { environment } from 'src/environments/environment';
import { Category } from 'src/app/Models/Category';
import { ImageProduct } from 'src/app/Models/ImageProduct';
import { FilterTag } from 'src/app/Models/FilterTag';
import { ProductFilterTagDTO } from 'src/app/Models/ProductFilterTagDTO';
import { ProductFilterTag } from 'src/app/Models/ProductFilterTag';
import { Material } from 'src/app/Models/Material';
import { Option } from 'src/app/Models/Option';
import { Dimension } from 'src/app/Models/Dimension';
import { OptionDTO } from 'src/app/Models/OptionDTO';

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
  selectedMaterial: Material;
  selectedAvailable: string = "Available";
  images: string[];
  filterTags: ProductFilterTagDTO[][];
  availables: string[] = ["Available", "Not Available"];
  materials: Material[] = [];
  selectedWoodMaterials: Material[] = [];
  selectedStoneMaterials: Material[] = [];
  selectedIronMaterials: Material[] = [];
  dimensions: Dimension[] = [];
  options: Option[] = [];
  length: number;
  height: number;
  width: number;

  constructor(private formBuilder: FormBuilder, private damService: DAMService) {

    this.damService.current.subscribe(c => {
      if (c != null) {
        switch (c.type) {
          case Type.Product:
            console.log(c);
            this.product = c;

            this.damService.getFilterTagsByProduct(this.product.id).subscribe(response => {
              this.filterTags = response.data;
            })

            this.damService.getCategories().subscribe(r => {
              this.categories = r.data;
              if (this.product.category != null) {
                this.selectedCategory = this.categories.find(c => c.id == this.product.category.id);
              } else {
                this.selectedCategory = this.categories[0];
              }
            });

            this.damService.getMaterials().subscribe(response => {
              this.materials = response.data;
              this.selectedMaterial = response.data[0];
              console.log(this.materials);

              this.damService.getProductOptions(this.product.id).subscribe(response => {
                console.log(response.data);
                let wood = [];
                let stone = [];
                let iron = [];
                let dimensions = [];
                let options = [];

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

                  let o: Option = { dimension: dimension, materialIron: option.materialIron, materialStone: option.materialStone, materialWood: option.materialWood, price: option.price };

                  this.options.push(o);
                });

                let uniqueWood = this.getUnique(wood);
                let uniqueStone = this.getUnique(stone);
                let uniqueIron = this.getUnique(iron);
                let uniqueDimension = this.getUniqueDimensions(dimensions);

                this.selectedWoodMaterials = uniqueWood;
                this.selectedStoneMaterials = uniqueStone;
                this.selectedIronMaterials = uniqueIron;
                this.dimensions = uniqueDimension;

                this.selectedStoneMaterials.forEach((material) => {
                  this.removeMaterialFromList(material);
                });

                this.selectedWoodMaterials.forEach((material) => {
                  this.removeMaterialFromList(material);
                });

                this.selectedIronMaterials.forEach((material) => {
                  this.removeMaterialFromList(material);
                });
              });
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

            if (this.product.available) {
              this.selectedAvailable = "Available";
            } else {
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

  selectTag(i: number, j: number, active: boolean) {
    this.filterTags[i][j].active = !active;

    if (!this.filterTags[i][j].active) {
      let productFilterTag: ProductFilterTag = { filterTagId: this.filterTags[i][j].id, productId: this.product.id, id: 0 };
      this.damService.addProductFilterTag(productFilterTag).subscribe(response => console.log(response));
    } else {
      let productFilterTag: ProductFilterTag = { filterTagId: this.filterTags[i][j].id, productId: this.product.id, id: 0 };
      this.damService.deleteProductFilterTag(productFilterTag).subscribe(response => console.log(response));
    }
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

    if (this.selectedAvailable == "Available") {
      available = true;
    }

    let product = new Product(this.product.id, this.f.title.value, this.f.description.value, this.f.price.value, imageProducts, this.selectedCategory, available);

    if (!this.product.images) {
      this.product.images = [];
    }
    this.damService.updateProduct(product).subscribe(response => {
      this.product = response.data;

      let options: OptionDTO[] = [];

      this.options.forEach((o) => {
        let option: OptionDTO = {
          productId: this.product.id,
          price: o.price,
          height: o.dimension.height,
          width: o.dimension.width,
          length: o.dimension.length,
          materialWood: o.materialWood,
          materialStone: o.materialStone,
          materialIron: o.materialIron
        };
        options.push(option);
      });

      this.damService.addProductOptions(this.product.id, options).subscribe(response => {
        console.log(response);
      });

      this.damService.getProducts().subscribe(responseProducts => {
        this.damService.productsSubject.next(responseProducts.data);
      });
    });

  }

  onChange(category: Category) {
    this.contentForm.markAsDirty();
  }

  removeMaterialFromList(material: Material) {
    let index = this.materials.findIndex(m => m.id == material.id);
    this.materials.splice(index, 1);

    if (this.materials.length > 0) {
      this.selectedMaterial = this.materials[0];
    }
  }

  addMaterial() {
    switch (this.selectedMaterial.category.id) {
      case 3:
        this.selectedWoodMaterials.push(this.selectedMaterial);
        break;
      case 4:
        this.selectedStoneMaterials.push(this.selectedMaterial);
        break;
      case 5:
        this.selectedIronMaterials.push(this.selectedMaterial);
        break;
    }

    this.removeMaterialFromList(this.selectedMaterial);

    let option: Option = null;
    this.options = [];
    if (this.dimensions.length == 0) {
      if (this.selectedWoodMaterials.length > 0) {
        this.selectedWoodMaterials.forEach((selectedWood) => {
          if (this.selectedStoneMaterials.length > 0) {
            this.selectedStoneMaterials.forEach((selectedStone) => {
              if (this.selectedIronMaterials.length > 0) {
                this.selectedIronMaterials.forEach((selectedIron) => {
                  option = { dimension: null, price: 0, materialIron: selectedIron, materialStone: selectedStone, materialWood: selectedWood };
                  this.options.push(option);
                });
              } else {
                option = { dimension: null, price: 0, materialIron: null, materialStone: selectedStone, materialWood: selectedWood };
                this.options.push(option);
              }
            });
          } else {
            if (this.selectedIronMaterials.length > 0) {
              this.selectedIronMaterials.forEach((selectedIron) => {
                option = { dimension: null, price: 0, materialIron: selectedIron, materialStone: null, materialWood: selectedWood };
                this.options.push(option);
              });
            } else {
              option = { dimension: null, price: 0, materialIron: null, materialStone: null, materialWood: selectedWood };
              this.options.push(option);
            }
          }
        });
      } else {
        if (this.selectedStoneMaterials.length > 0) {
          this.selectedStoneMaterials.forEach((selectedStone) => {
            if (this.selectedIronMaterials.length > 0) {
              this.selectedIronMaterials.forEach((selectedIron) => {
                option = { dimension: null, price: 0, materialIron: selectedIron, materialStone: selectedStone, materialWood: null };
                this.options.push(option);
              });
            } else {
              option = { dimension: null, price: 0, materialIron: null, materialStone: selectedStone, materialWood: null };
              this.options.push(option);
            }
          });
        } else {
          this.selectedIronMaterials.forEach((selectedIron) => {
            option = { dimension: null, price: 0, materialIron: selectedIron, materialStone: null, materialWood: null };
            this.options.push(option);
          });
        }
      }
    } else {
      this.dimensions.forEach((dimension) => {
        if (this.selectedWoodMaterials.length > 0) {
          this.selectedWoodMaterials.forEach((selectedWood) => {
            if (this.selectedStoneMaterials.length > 0) {
              this.selectedStoneMaterials.forEach((selectedStone) => {
                if (this.selectedIronMaterials.length > 0) {
                  this.selectedIronMaterials.forEach((selectedIron) => {
                    option = { dimension: dimension, price: 0, materialIron: selectedIron, materialStone: selectedStone, materialWood: selectedWood };
                    this.options.push(option);
                  });
                } else {
                  option = { dimension: dimension, price: 0, materialIron: null, materialStone: selectedStone, materialWood: selectedWood };
                  this.options.push(option);
                }
              });
            } else {
              if (this.selectedIronMaterials.length > 0) {
                this.selectedIronMaterials.forEach((selectedIron) => {
                  option = { dimension: dimension, price: 0, materialIron: selectedIron, materialStone: null, materialWood: selectedWood };
                  this.options.push(option);
                });
              } else {
                option = { dimension: dimension, price: 0, materialIron: null, materialStone: null, materialWood: selectedWood };
                this.options.push(option);
              }
            }
          });
        } else {
          if (this.selectedStoneMaterials.length > 0) {
            this.selectedStoneMaterials.forEach((selectedStone) => {
              if (this.selectedIronMaterials.length > 0) {
                this.selectedIronMaterials.forEach((selectedIron) => {
                  option = { dimension: dimension, price: 0, materialIron: selectedIron, materialStone: selectedStone, materialWood: null };
                  this.options.push(option);
                });
              } else {
                option = { dimension: dimension, price: 0, materialIron: null, materialStone: selectedStone, materialWood: null };
                this.options.push(option);
              }
            });
          } else {
            this.selectedIronMaterials.forEach((selectedIron) => {
              option = { dimension: dimension, price: 0, materialIron: selectedIron, materialStone: null, materialWood: null };
              this.options.push(option);
            });
          }
        }
      });
    }

    console.log(this.options);
  }

  addDimensions() {
    let dimension: Dimension = { id: 0, height: this.height, width: this.width, length: this.length };
    this.height = 0;
    this.width = 0;
    this.length = 0;
    let option: Option = null;
    this.dimensions.push(dimension);
    this.options = [];
    this.dimensions.forEach((dimension) => {
      if (this.selectedWoodMaterials.length > 0) {
        this.selectedWoodMaterials.forEach((selectedWood) => {
          if (this.selectedStoneMaterials.length > 0) {
            this.selectedStoneMaterials.forEach((selectedStone) => {
              if (this.selectedIronMaterials.length > 0) {
                this.selectedIronMaterials.forEach((selectedIron) => {
                  option = { dimension: dimension, price: 0, materialIron: selectedIron, materialStone: selectedStone, materialWood: selectedWood };
                  this.options.push(option);
                });
              } else {
                option = { dimension: dimension, price: 0, materialIron: null, materialStone: selectedStone, materialWood: selectedWood };
                this.options.push(option);
              }
            });
          } else {
            if (this.selectedIronMaterials.length > 0) {
              this.selectedIronMaterials.forEach((selectedIron) => {
                option = { dimension: dimension, price: 0, materialIron: selectedIron, materialStone: null, materialWood: selectedWood };
                this.options.push(option);
              });
            } else {
              option = { dimension: dimension, price: 0, materialIron: null, materialStone: null, materialWood: selectedWood };
              this.options.push(option);
            }
          }
        });
      } else {
        if (this.selectedStoneMaterials.length > 0) {
          this.selectedStoneMaterials.forEach((selectedStone) => {
            if (this.selectedIronMaterials.length > 0) {
              this.selectedIronMaterials.forEach((selectedIron) => {
                option = { dimension: dimension, price: 0, materialIron: selectedIron, materialStone: selectedStone, materialWood: null };
                this.options.push(option);
              });
            } else {
              option = { dimension: dimension, price: 0, materialIron: null, materialStone: selectedStone, materialWood: null };
              this.options.push(option);
            }
          });
        } else {
          this.selectedIronMaterials.forEach((selectedIron) => {
            option = { dimension: dimension, price: 0, materialIron: selectedIron, materialStone: null, materialWood: null };
            this.options.push(option);
          });
        }
      }
    });
  }

  updatePrice(index: number, price: number) {
    this.contentForm.markAsDirty();
    this.options[index].price = price;
    console.log(this.options);
  }

  removeOption(index: number) {
    this.options.splice(index, 1);
    this.contentForm.markAsDirty();
  }
}



interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}