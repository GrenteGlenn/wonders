import { TestBed } from '@angular/core/testing';

import { FlyService } from './fly.service';

describe('FlyService', () => {
  let service: FlyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
