import { TestBed, inject } from '@angular/core/testing';

import { AchievementsService } from './achievements.service';

describe('AchievementsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AchievementsService]
    });
  });

  it('should be created', inject([AchievementsService], (service: AchievementsService) => {
    expect(service).toBeTruthy();
  }));
});
