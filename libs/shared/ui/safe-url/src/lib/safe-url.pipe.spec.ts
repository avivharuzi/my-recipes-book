import { DomSanitizer } from '@angular/platform-browser';
import { TestBed } from '@angular/core/testing';

import { SafeUrlPipe } from './safe-url.pipe';

describe('SafeUrlPipe', () => {
  it('create an instance', () => {
    const domSanitizer = TestBed.inject(DomSanitizer);
    const pipe = new SafeUrlPipe(domSanitizer);
    expect(pipe).toBeTruthy();
  });
});
