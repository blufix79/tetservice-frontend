/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { InterventionsService } from './interventions.service';

describe('Service: Interventions', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InterventionsService]
    });
  });

  it('should ...', inject([InterventionsService], (service: InterventionsService) => {
    expect(service).toBeTruthy();
  }));
});
