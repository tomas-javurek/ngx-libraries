import { TestBed } from '@angular/core/testing';

import { NgxIndexedDbService } from './ngx-indexed-db.service';

describe('NgxIndexedDbService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxIndexedDbService = TestBed.get(NgxIndexedDbService);
    expect(service).toBeTruthy();
  });
});
