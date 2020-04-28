import { TestBed } from '@angular/core/testing';

import { TiketServicesService } from './tiket-services.service';

describe('TiketServicesService', () => {
  let service: TiketServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiketServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
