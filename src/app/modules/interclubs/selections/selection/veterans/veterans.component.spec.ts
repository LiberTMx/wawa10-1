import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VeteransComponent } from './veterans.component';

describe('VeteransComponent', () => {
  let component: VeteransComponent;
  let fixture: ComponentFixture<VeteransComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VeteransComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VeteransComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
