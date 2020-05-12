import { TestBed } from '@angular/core/testing';

import { EntrainementsService } from './entrainements.service';

describe('EntrainementsService', () => {
  let service: EntrainementsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntrainementsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
