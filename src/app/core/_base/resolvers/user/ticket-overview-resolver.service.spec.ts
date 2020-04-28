import { TestBed } from '@angular/core/testing';

import { TicketOverviewResolverService } from './ticket-overview-resolver.service';

describe('TicketOverviewResolverService', () => {
  let service: TicketOverviewResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketOverviewResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
