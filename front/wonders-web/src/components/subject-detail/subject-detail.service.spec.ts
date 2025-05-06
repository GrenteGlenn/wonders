import { TestBed } from '@angular/core/testing';

import { SubjectDetailService } from '../components/subjec/subject.service';

describe('SubjectDetailService', () => {
  let service: SubjectDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubjectDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
