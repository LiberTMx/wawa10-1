import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FonctionsComponent } from './fonctions.component';

describe('FonctionsComponent', () => {
  let component: FonctionsComponent;
  let fixture: ComponentFixture<FonctionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FonctionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FonctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
