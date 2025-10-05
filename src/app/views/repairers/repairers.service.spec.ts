import { TestBed } from '@angular/core/testing';

import { RepairersService } from './repairers.service';

describe('RepairersService', () => {
  let service: RepairersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepairersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
