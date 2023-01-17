import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuildAchievementsComponent } from './guild-achievements.component';

describe('GuildAchievementsComponent', () => {
  let component: GuildAchievementsComponent;
  let fixture: ComponentFixture<GuildAchievementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuildAchievementsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuildAchievementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
