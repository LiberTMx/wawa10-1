import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodeAddDialogComponent } from './periode-add-dialog.component';

describe('PeriodeAddDialogComponent', () => {
  let component: PeriodeAddDialogComponent;
  let fixture: ComponentFixture<PeriodeAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodeAddDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodeAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
