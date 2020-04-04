import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DivisionsByCategoryComponent } from './divisions-by-category.component';

describe('DivisionsByCategoryComponent', () => {
  let component: DivisionsByCategoryComponent;
  let fixture: ComponentFixture<DivisionsByCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DivisionsByCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DivisionsByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
