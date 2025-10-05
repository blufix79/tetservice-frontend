import { TestBed } from '@angular/core/testing';

import { RepairtypesService } from './repairtypes.service';

describe('RepairtypesService', () => {
  let service: RepairtypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepairtypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
