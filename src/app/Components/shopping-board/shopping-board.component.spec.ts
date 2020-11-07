import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingBoardComponent } from './shopping-board.component';

describe('ShoppingBoardComponent', () => {
  let component: ShoppingBoardComponent;
  let fixture: ComponentFixture<ShoppingBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
