/* eslint-disable @typescript-eslint/no-unused-vars */

import { TestBed, async, inject } from '@angular/core/testing';
import { BackendService } from './backend.service';

describe('Service: Developer', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BackendService]
    });
  });

  it('should ...', inject([BackendService], (service: BackendService) => {
    expect(service).toBeTruthy();
  }));
});
