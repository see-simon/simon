import { TestBed } from '@angular/core/testing';

import { UserMethodsService } from './user-methods.service';

describe('UserMethodsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserMethodsService = TestBed.get(UserMethodsService);
    expect(service).toBeTruthy();
  });
});
