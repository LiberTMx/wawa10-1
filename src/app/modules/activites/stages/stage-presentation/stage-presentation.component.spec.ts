import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StagePresentationComponent } from './stage-presentation.component';

describe('StagePresentationComponent', () => {
  let component: StagePresentationComponent;
  let fixture: ComponentFixture<StagePresentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StagePresentationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StagePresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
