import { TestBed, inject } from '@angular/core/testing';

import { ThucdonserviceService } from './thucdonservice.service';

describe('ThucdonserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThucdonserviceService]
    });
  });

  it('should be created', inject([ThucdonserviceService], (service: ThucdonserviceService) => {
    expect(service).toBeTruthy();
  }));
});
