import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasseGroupeAddDialogComponent } from './classe-groupe-add-dialog.component';

describe('ClasseGroupeAddDialogComponent', () => {
  let component: ClasseGroupeAddDialogComponent;
  let fixture: ComponentFixture<ClasseGroupeAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClasseGroupeAddDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasseGroupeAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
