import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SemainesComponent } from './semaines.component';

describe('SemainesComponent', () => {
  let component: SemainesComponent;
  let fixture: ComponentFixture<SemainesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SemainesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SemainesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
