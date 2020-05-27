import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionValidationDialogComponent } from './selection-validation-dialog.component';

describe('SelectionValidationDialogComponent', () => {
  let component: SelectionValidationDialogComponent;
  let fixture: ComponentFixture<SelectionValidationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectionValidationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionValidationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
