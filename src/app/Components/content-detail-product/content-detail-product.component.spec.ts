import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentDetailProductComponent } from './content-detail-product.component';

describe('ContentDetailProductComponent', () => {
  let component: ContentDetailProductComponent;
  let fixture: ComponentFixture<ContentDetailProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentDetailProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentDetailProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
