import { TestBed } from '@angular/core/testing';

import { PeriodesService } from './periodes.service';

describe('PeriodesService', () => {
  let service: PeriodesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeriodesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
