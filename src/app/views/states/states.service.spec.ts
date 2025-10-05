/* eslint-disable @typescript-eslint/no-unused-vars */

import { TestBed, async, inject } from '@angular/core/testing';
import { StatesService } from './states.service';

describe('Service: States', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StatesService]
    });
  });

  it('should ...', inject([StatesService], (service: StatesService) => {
    expect(service).toBeTruthy();
  }));
});
