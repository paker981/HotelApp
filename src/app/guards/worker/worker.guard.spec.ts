import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { workerdGuard } from './worker.guard';

describe('canLoadDashboardGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => workerdGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
