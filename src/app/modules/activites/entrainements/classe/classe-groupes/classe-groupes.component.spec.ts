import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasseGroupesComponent } from './classe-groupes.component';

describe('ClasseGroupesComponent', () => {
  let component: ClasseGroupesComponent;
  let fixture: ComponentFixture<ClasseGroupesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClasseGroupesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasseGroupesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
