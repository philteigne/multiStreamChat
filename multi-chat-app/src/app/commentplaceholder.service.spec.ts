import { TestBed } from '@angular/core/testing';

import { CommentplaceholderService } from './commentplaceholder.service';

describe('CommentplaceholderService', () => {
  let service: CommentplaceholderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentplaceholderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
