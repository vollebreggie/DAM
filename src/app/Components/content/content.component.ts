import { Component, OnInit } from '@angular/core';
import { DAMService } from 'src/app/Services/DAMService';
import { AuthenticationService } from 'src/app/Services/AuthenticationService';
import { Landing } from 'src/app/Models/Landing';
import { Product } from 'src/app/Models/Product';
import { Material } from 'src/app/Models/Material';
import { Blog } from 'src/app/Models/Blog';
import { Reference } from 'src/app/Models/Reference';
import { Type } from 'src/app/Models/Enums/Type';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  landingList: Landing;
  products: Product[];
  materials: Material[];
  blogs: Blog[];
  references: Reference[];

  product: Product;
  landing: Landing;
  material: Material;
  blog: Blog;
  reference: Reference;
  filterTags: boolean = false;

  constructor(private damService: DAMService, private authenticationService: AuthenticationService) {
    damService.getLanding().subscribe(response => this.landingList = response.data);
    damService.getBlogs().subscribe(response => this.blogs = response.data);
    damService.getMaterials().subscribe(response => {
      this.materials = response.data;
      console.log(this.materials);
    });
    damService.getProducts().subscribe(response => this.products = response.data);
    damService.getReferences().subscribe(response => this.references = response.data);

    damService.products.subscribe(p => {
      this.products = p;
    });

    damService.references.subscribe(r => {
      this.references = r;
    });

    damService.blogs.subscribe(b => {
      this.blogs = b;
    });

    damService.materials.subscribe(m => {
      this.materials = m;
    });

    this.damService.current.subscribe(c => {
      if (c != null) {
        switch (c.type) {
          case Type.Product:
            this.product = c;
            this.landing = null;
            this.material = null;
            this.blog = null;
            this.reference = null;
            this.filterTags = false;
            break;
          case Type.Landing:
            this.landing = c;
            this.product = null;
            this.material = null;
            this.blog = null;
            this.reference = null;
            this.filterTags = false;
            break;
          case Type.Material:
            this.material = c;
            this.product = null;
            this.landing = null;
            this.blog = null;
            this.reference = null;
            this.filterTags = false;
            break;
          case Type.Blog:
            this.blog = c;
            this.material = null;
            this.reference = null;
            this.product = null;
            this.landing = null;
            this.filterTags = false;
            break;
          case Type.Reference:
            this.reference = c;
            this.material = null;
            this.product = null;
            this.landing = null;
            this.blog = null;
            this.filterTags = false;
            break;
          case Type.FilterTag:
            this.reference = null;
            this.material = null;
            this.product = null;
            this.landing = null;
            this.blog = null;
            this.filterTags = true;
            break;
          default:
            console.log("default");
        }
      }

    });
  }

  ngOnInit() {

  }

}
