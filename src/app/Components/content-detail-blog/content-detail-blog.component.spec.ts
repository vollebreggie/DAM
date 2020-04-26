import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentDetailBlogComponent } from './content-detail-blog.component';

describe('ContentDetailBlogComponent', () => {
  let component: ContentDetailBlogComponent;
  let fixture: ComponentFixture<ContentDetailBlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentDetailBlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentDetailBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
