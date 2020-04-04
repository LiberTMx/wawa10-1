import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListesdesforcesComponent } from './listesdesforces.component';

describe('ListesdesforcesComponent', () => {
  let component: ListesdesforcesComponent;
  let fixture: ComponentFixture<ListesdesforcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListesdesforcesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListesdesforcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
