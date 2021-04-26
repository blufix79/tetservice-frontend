/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LotteriesService } from './lotteries.service';

describe('Service: Lotteries', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LotteriesService]
    });
  });

  it('should ...', inject([LotteriesService], (service: LotteriesService) => {
    expect(service).toBeTruthy();
  }));
});
