import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComiteComponent } from './comite.component';

describe('ComiteComponent', () => {
  let component: ComiteComponent;
  let fixture: ComponentFixture<ComiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
