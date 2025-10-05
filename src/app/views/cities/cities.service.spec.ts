/* eslint-disable @typescript-eslint/no-unused-vars */

import { TestBed, async, inject } from '@angular/core/testing';
import { CitiesService } from './cities.service';

describe('Service: Cities', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CitiesService]
    });
  });

  it('should ...', inject([CitiesService], (service: CitiesService) => {
    expect(service).toBeTruthy();
  }));
});
