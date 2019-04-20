import { TestBed, inject } from '@angular/core/testing';

import { NgxMediaDevicesService } from './ngx-media-devices.service';

describe('NgxMediaDevicesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxMediaDevicesService]
    });
  });

  it('should be created', inject([NgxMediaDevicesService], (service: NgxMediaDevicesService) => {
    expect(service).toBeTruthy();
  }));
});
