import { TestBed } from '@angular/core/testing';

import { RoiService } from './roi.service';

describe('RoiService', () => {
  let service: RoiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
