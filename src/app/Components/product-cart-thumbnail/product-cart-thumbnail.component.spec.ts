import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCartThumbnailComponent } from './product-cart-thumbnail.component';

describe('ProductCartThumbnailComponent', () => {
  let component: ProductCartThumbnailComponent;
  let fixture: ComponentFixture<ProductCartThumbnailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCartThumbnailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCartThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
