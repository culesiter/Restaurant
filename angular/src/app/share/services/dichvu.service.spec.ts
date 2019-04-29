import { TestBed, inject } from '@angular/core/testing';

import { DichvuService } from './dichvu.service';

describe('DichvuService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DichvuService]
    });
  });

  it('should be created', inject([DichvuService], (service: DichvuService) => {
    expect(service).toBeTruthy();
  }));
});
