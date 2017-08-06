import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterAchievementComponent } from './character-achievement.component';

describe('CharacterAchievementComponent', () => {
  let component: CharacterAchievementComponent;
  let fixture: ComponentFixture<CharacterAchievementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterAchievementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterAchievementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
