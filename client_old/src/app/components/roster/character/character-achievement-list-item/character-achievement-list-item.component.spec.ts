import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterAchievementListItemComponent } from './character-achievement-list-item.component';

describe('CharacterAchievementListItemComponent', () => {
  let component: CharacterAchievementListItemComponent;
  let fixture: ComponentFixture<CharacterAchievementListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterAchievementListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterAchievementListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
