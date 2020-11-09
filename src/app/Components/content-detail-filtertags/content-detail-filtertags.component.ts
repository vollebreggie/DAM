import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FilterTag } from 'src/app/Models/FilterTag';
import { DAMService } from 'src/app/Services/DAMService';

@Component({
  selector: 'content-detail-filtertags',
  templateUrl: './content-detail-filtertags.component.html',
  styleUrls: ['./content-detail-filtertags.component.css']
})
export class ContentDetailFiltertagsComponent implements OnInit {

  filterTags: FilterTag[];
  selectedTag: FilterTag = { id: 0, title: ""};
  formData: FormData = new FormData();
  tagForm: FormGroup;

  constructor(private damService: DAMService, private formBuilder: FormBuilder) { 
    this.tagForm = this.formBuilder.group({
      title: ["", Validators.required]
    });
    
    
    this.damService.getFilterTags().subscribe(response => {
      this.filterTags = response.data;
    })
  }

  get f() { return this.tagForm.controls; }


  onSubmit() {

    if (this.tagForm.invalid) {
      return;
    }
    
    this.damService.addFilterTag({ id: this.selectedTag.id, title: this.tagForm.value.title}).subscribe(response => {
      console.log(response);
    });

    this.tagForm.markAsPristine();
    this.tagForm.setValue({title: ""});
  }

  ngOnInit() { }

  addFilterTag(title: string) {
    let tag: FilterTag = { id: 0, title: title };
    this.damService.addFilterTag(tag).subscribe(response => {
      console.log(response);
    });
  }

  updateFilterTag(){
    this.damService.updateFilterTag(this.selectedTag).subscribe();
  }

  removeFilterTag(tag: FilterTag) {
    this.damService.deleteFilterTag(tag).subscribe();
  }
}
