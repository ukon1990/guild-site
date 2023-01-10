import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterAchievementsComponent } from './character-achievements.component';

describe('CharacterAchievementsComponent', () => {
  let component: CharacterAchievementsComponent;
  let fixture: ComponentFixture<CharacterAchievementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterAchievementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterAchievementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
