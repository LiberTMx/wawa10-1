import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendriersByCategoryComponent } from './calendriers-by-category.component';

describe('CalendriersByCategoryComponent', () => {
  let component: CalendriersByCategoryComponent;
  let fixture: ComponentFixture<CalendriersByCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendriersByCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendriersByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
