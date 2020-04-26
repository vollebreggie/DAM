import { Component, OnInit, Input } from '@angular/core';
import { Landing } from 'src/app/Models/Landing';
import { Product } from 'src/app/Models/Product';
import { Material } from 'src/app/Models/Material';
import { Blog } from 'src/app/Models/Blog';
import { DAMService } from 'src/app/Services/DAMService';
import { Type } from 'src/app/Models/Enums/Type';
import { FooterService } from 'src/app/Services/FooterService';
import { Reference } from 'src/app/Models/Reference';

@Component({
  selector: 'content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.css']
})
export class ContentListComponent implements OnInit {

  @Input() landing: Landing;
  @Input() products: Product[];
  @Input() materials: Material[];
  @Input() blogs: Blog[];
  @Input() references: Reference[];

  constructor(private damService: DAMService, private footerService: FooterService) {
    this.footerService.footerSubject.next(false);
  }

  ngOnInit() {

  }

  click(item: any, type: string) {
    if (type == "product") {
      item.type = Type.Product;
    } else if (type == "landing") {
      item.type = Type.Landing;
    } else if (type == "material") {
      item.type = Type.Material;
    } else if (type == "blog") {
      item.type = Type.Blog;
    } else if (type == "reference") {
      item.type = Type.Reference;
    }

    this.damService.currentSubject.next(item);
  }

  deleteProduct(productId: number) {
    this.damService.deleteProduct(productId).subscribe();
    this.products.splice(this.products.findIndex(p => p.id == productId), 1);
  }

  deleteMaterial(materialId: number) {
    this.damService.deleteMaterial(materialId).subscribe();
    this.materials.splice(this.materials.findIndex(p => p.id == materialId), 1);
  }

  deleteBlog(blogId: number) {
    this.damService.deleteBlog(blogId).subscribe();
    this.blogs.splice(this.blogs.findIndex(p => p.id == blogId), 1);
  }

  deleteReference(referenceId: number) {
    this.damService.deleteReference(referenceId).subscribe();
    this.references.splice(this.references.findIndex(p => p.id == referenceId), 1);
  }

  create(type: string) {

    if (type == "product") {
      let product = new Product(0, "some", "some", 0, "example.jpg", null);
      product.type = Type.Product;
      this.products.push(product);
      this.damService.currentSubject.next(product);
    } else if (type == "material") {
      let material = new Material(0, "some", "some", "example.jpg", null);
      material.type = Type.Material;
      this.materials.push(material);
      this.damService.currentSubject.next(material);
    } else if (type == "blog") {
      let blog = new Blog(0, "some", "some", "example.jpg", null);
      blog.type = Type.Blog;
      this.blogs.push(blog);
      this.damService.currentSubject.next(blog);
    } else if (type == "reference") {
      let reference = new Reference(0, "some", "some", "example.jpg", 5);
      reference.type = Type.Reference;
      this.references.push(reference);
      this.damService.currentSubject.next(reference);
    }


  }
}
