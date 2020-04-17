import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { DataGuard } from './data-guard.component';

describe('DataGuardComponent', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ DataGuard ]
    });
  });

  it('should create', inject([DataGuard], (service: DataGuard) => {
    expect(service).toBeTruthy();
  }));
});
