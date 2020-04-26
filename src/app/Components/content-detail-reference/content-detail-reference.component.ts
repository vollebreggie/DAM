import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { DAMService } from 'src/app/Services/DAMService';
import { Type } from 'src/app/Models/Enums/Type';
import { Reference } from 'src/app/Models/Reference';

@Component({
  selector: 'content-detail-reference',
  templateUrl: './content-detail-reference.component.html',
  styleUrls: ['./content-detail-reference.component.css']
})
export class ContentDetailReferenceComponent implements OnInit {
  imageSrc: string;
  file: HTMLInputEvent;
  contentForm: FormGroup;
  @Input() reference: Reference;
  formData: FormData = new FormData();
  url: string = environment.apiUrl + "images/";
  dirty: boolean = false;

  constructor(private formBuilder: FormBuilder, private damService: DAMService) {
    this.damService.current.subscribe(c => {
      if (c != null) {
        switch (c.type) {
          case Type.Reference:

            this.reference = c;

            this.imageSrc = this.reference.image;
            this.contentForm = this.formBuilder.group({
              name: [this.reference.name, Validators.required],
              message: [this.reference.message, Validators.required]
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
      name: [this.reference.name, Validators.required],
      message: [this.reference.message, Validators.required]
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
    let reference = new Reference(this.reference.id, this.f.name.value, this.f.message.value, this.imageSrc, 0);
    if (this.dirty) {

      this.damService.uploadImage(this.formData, "reference").subscribe(response => {
        reference.image = response.text;
        this.damService.updateReference(reference).subscribe(response => {
          this.reference = response.data;

          this.damService.getReferences().subscribe(responseReferences => {
            this.damService.referencesSubject.next(responseReferences.data);
          });
        });
      });

    } else {

      if (!this.reference.image) {
        this.reference.image = "example.jpg";
      }
      this.damService.updateReference(reference).subscribe(response => {
        this.reference = response.data;

        this.damService.getReferences().subscribe(responseReferences => {
          this.damService.referencesSubject.next(responseReferences.data);
        });
      });

    }
  }
}



interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}