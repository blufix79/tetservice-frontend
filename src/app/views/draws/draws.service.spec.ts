/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DrawsService } from './draws.service';

describe('Service: Draws', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DrawsService]
    });
  });

  it('should ...', inject([DrawsService], (service: DrawsService) => {
    expect(service).toBeTruthy();
  }));
});
