import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportedMatchTypesComponent } from './supported-match-types.component';

describe('SupportedMatchTypesComponent', () => {
  let component: SupportedMatchTypesComponent;
  let fixture: ComponentFixture<SupportedMatchTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupportedMatchTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportedMatchTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
