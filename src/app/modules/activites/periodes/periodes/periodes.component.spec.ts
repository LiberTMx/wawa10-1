import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodesComponent } from './periodes.component';

describe('PeriodesComponent', () => {
  let component: PeriodesComponent;
  let fixture: ComponentFixture<PeriodesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
