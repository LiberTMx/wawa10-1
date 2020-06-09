import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComiteOrganisationComponent } from './comite-organisation.component';

describe('ComiteOrganisationComponent', () => {
  let component: ComiteOrganisationComponent;
  let fixture: ComponentFixture<ComiteOrganisationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComiteOrganisationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComiteOrganisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
