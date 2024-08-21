import { TestBed } from '@angular/core/testing';

import { PhaserService } from './phaser.service';

describe('PhaserService', () => {
  let service: PhaserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhaserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
