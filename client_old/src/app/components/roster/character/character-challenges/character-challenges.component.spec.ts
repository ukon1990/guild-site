import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterChallengesComponent } from './character-challenges.component';

describe('CharacterChallengesComponent', () => {
  let component: CharacterChallengesComponent;
  let fixture: ComponentFixture<CharacterChallengesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterChallengesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterChallengesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
