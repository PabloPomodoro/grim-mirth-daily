import { TestBed } from '@angular/core/testing';

import { DenoService } from './deno.service';

describe('DenoService', () => {
  let service: DenoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DenoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
