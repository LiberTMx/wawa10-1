import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionInformationComponent } from './selection-information.component';

describe('SelectionInformationComponent', () => {
  let component: SelectionInformationComponent;
  let fixture: ComponentFixture<SelectionInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectionInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
