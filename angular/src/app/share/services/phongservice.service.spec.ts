import { TestBed, inject } from '@angular/core/testing';

import { PhongserviceService } from './phongservice.service';

describe('PhongserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PhongserviceService]
    });
  });

  it('should be created', inject([PhongserviceService], (service: PhongserviceService) => {
    expect(service).toBeTruthy();
  }));
});
