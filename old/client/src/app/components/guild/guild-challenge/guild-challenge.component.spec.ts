import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuildChallengeComponent } from './guild-challenge.component';

describe('GuildChallengeComponent', () => {
  let component: GuildChallengeComponent;
  let fixture: ComponentFixture<GuildChallengeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuildChallengeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuildChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
