import { TestBed } from '@angular/core/testing';

import { NbGalleryService } from './nb-gallery.service';

describe('NbGalleryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NbGalleryService = TestBed.get(NbGalleryService);
    expect(service).toBeTruthy();
  });
});
