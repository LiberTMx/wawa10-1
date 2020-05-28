import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionInformationByTeamComponent } from './selection-information-by-team.component';

describe('SelectionInformationByTeamComponent', () => {
  let component: SelectionInformationByTeamComponent;
  let fixture: ComponentFixture<SelectionInformationByTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectionInformationByTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionInformationByTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
