import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentDetailMaterialComponent } from './content-detail-material.component';

describe('ContentDetailMaterialComponent', () => {
  let component: ContentDetailMaterialComponent;
  let fixture: ComponentFixture<ContentDetailMaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentDetailMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentDetailMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
