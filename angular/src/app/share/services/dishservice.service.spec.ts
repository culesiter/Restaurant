import { TestBed, inject } from '@angular/core/testing';

import { DishserviceService } from './dishservice.service';

describe('DishserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DishserviceService]
    });
  });

  it('should be created', inject([DishserviceService], (service: DishserviceService) => {
    expect(service).toBeTruthy();
  }));
});
