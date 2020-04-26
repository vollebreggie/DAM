import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Blog } from 'src/app/Models/Blog';
import { environment } from 'src/environments/environment';
import { DAMService } from 'src/app/Services/DAMService';
import { Type } from 'src/app/Models/Enums/Type';

@Component({
  selector: 'content-detail-blog',
  templateUrl: './content-detail-blog.component.html',
  styleUrls: ['./content-detail-blog.component.css']
})
export class ContentDetailBlogComponent implements OnInit {
  imageSrc: string;
  file: HTMLInputEvent;
  contentForm: FormGroup;
  @Input() blog: Blog;
  formData: FormData = new FormData();
  url: string = environment.apiUrl + "images/";
  dirty: boolean = false;

  constructor(private formBuilder: FormBuilder, private damService: DAMService) {
    this.damService.current.subscribe(c => {
      if (c != null) {
        switch (c.type) {
          case Type.Blog:

            this.blog = c;

            this.imageSrc = this.blog.image;
            this.contentForm = this.formBuilder.group({
              title: [this.blog.title, Validators.required],
              description: [this.blog.description, Validators.required]
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
      title: [this.blog.title, Validators.required],
      description: [this.blog.description, Validators.required]
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
    let blog = new Blog(this.blog.id, this.f.title.value, this.f.description.value, this.imageSrc, null);
    if (this.dirty) {

      this.damService.uploadImage(this.formData, "blog").subscribe(response => {
        blog.image = response.text;
        this.damService.updateBlog(blog).subscribe(response => {
          this.blog = response.data;

          this.damService.getBlogs().subscribe(responseBlogs => {
            this.damService.blogsSubject.next(responseBlogs.data);
          });
        });
      });

    } else {

      if (!this.blog.image) {
        this.blog.image = "example.jpg";
      }
      this.damService.updateBlog(blog).subscribe(response => {
        this.blog = response.data;

        this.damService.getBlogs().subscribe(responseBlogs => {
          this.damService.blogsSubject.next(responseBlogs.data);
        });
      });

    }
  }
}



interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}