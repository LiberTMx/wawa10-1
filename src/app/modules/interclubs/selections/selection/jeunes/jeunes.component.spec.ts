import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JeunesComponent } from './jeunes.component';

describe('JeunesComponent', () => {
  let component: JeunesComponent;
  let fixture: ComponentFixture<JeunesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JeunesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JeunesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
