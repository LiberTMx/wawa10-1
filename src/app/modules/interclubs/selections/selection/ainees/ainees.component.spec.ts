import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AineesComponent } from './ainees.component';

describe('AineesComponent', () => {
  let component: AineesComponent;
  let fixture: ComponentFixture<AineesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AineesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AineesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
