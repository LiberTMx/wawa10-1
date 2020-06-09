import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComiteOrganisationUpdateComponent } from './comite-organisation-update.component';

describe('ComiteOrganisationUpdateComponent', () => {
  let component: ComiteOrganisationUpdateComponent;
  let fixture: ComponentFixture<ComiteOrganisationUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComiteOrganisationUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComiteOrganisationUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
