import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentDetailFiltertagsComponent } from './content-detail-filtertags.component';

describe('ContentDetailFiltertagsComponent', () => {
  let component: ContentDetailFiltertagsComponent;
  let fixture: ComponentFixture<ContentDetailFiltertagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentDetailFiltertagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentDetailFiltertagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
