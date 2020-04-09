import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SemainesByCategoryComponent } from './semaines-by-category.component';

describe('SemainesByCategoryComponent', () => {
  let component: SemainesByCategoryComponent;
  let fixture: ComponentFixture<SemainesByCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SemainesByCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SemainesByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
