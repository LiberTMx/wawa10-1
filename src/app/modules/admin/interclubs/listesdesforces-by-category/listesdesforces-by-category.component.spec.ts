import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListesdesforcesByCategoryComponent } from './listesdesforces-by-category.component';

describe('ListesdesforcesByCategoryComponent', () => {
  let component: ListesdesforcesByCategoryComponent;
  let fixture: ComponentFixture<ListesdesforcesByCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListesdesforcesByCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListesdesforcesByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
