import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { roomDataResolver } from './room-data.resolver';

describe('roomDataResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => roomDataResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
