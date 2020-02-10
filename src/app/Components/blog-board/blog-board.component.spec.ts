import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogBoardComponent } from './blog-board.component';

describe('BlogBoardComponent', () => {
  let component: BlogBoardComponent;
  let fixture: ComponentFixture<BlogBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
