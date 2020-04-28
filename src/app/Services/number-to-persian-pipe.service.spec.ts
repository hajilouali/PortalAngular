import { TestBed } from '@angular/core/testing';

import { NumberToPersianPipeService } from './number-to-persian-pipe.service';

describe('NumberToPersianPipeService', () => {
  let service: NumberToPersianPipeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NumberToPersianPipeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
