import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsBoardComponent } from './products-board.component';

describe('ProductsBoardComponent', () => {
  let component: ProductsBoardComponent;
  let fixture: ComponentFixture<ProductsBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
