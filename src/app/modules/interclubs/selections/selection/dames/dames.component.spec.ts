import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DamesComponent } from './dames.component';

describe('DamesComponent', () => {
  let component: DamesComponent;
  let fixture: ComponentFixture<DamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
