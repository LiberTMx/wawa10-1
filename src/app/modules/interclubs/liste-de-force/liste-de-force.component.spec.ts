import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDeForceComponent } from './liste-de-force.component';

describe('ListeDeForceComponent', () => {
  let component: ListeDeForceComponent;
  let fixture: ComponentFixture<ListeDeForceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeDeForceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeDeForceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
