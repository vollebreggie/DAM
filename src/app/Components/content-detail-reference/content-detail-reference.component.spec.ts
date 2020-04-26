import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentDetailReferenceComponent } from './content-detail-reference.component';

describe('ContentDetailReferenceComponent', () => {
  let component: ContentDetailReferenceComponent;
  let fixture: ComponentFixture<ContentDetailReferenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentDetailReferenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentDetailReferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
