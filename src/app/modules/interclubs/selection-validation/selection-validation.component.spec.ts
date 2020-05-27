import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionValidationComponent } from './selection-validation.component';

describe('SelectionValidationComponent', () => {
  let component: SelectionValidationComponent;
  let fixture: ComponentFixture<SelectionValidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectionValidationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
