import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentDetailLandingComponent } from './content-detail-landing.component';

describe('ContentDetailLandingComponent', () => {
  let component: ContentDetailLandingComponent;
  let fixture: ComponentFixture<ContentDetailLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentDetailLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentDetailLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
