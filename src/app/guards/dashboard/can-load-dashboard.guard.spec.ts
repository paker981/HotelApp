import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { canMatchDashboardGuard } from '../dashboard/can-load-dashboard.guard';

describe('canLoadDashboardGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => canMatchDashboardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
