import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterFeedComponent } from './character-feed.component';

describe('CharacterFeedComponent', () => {
  let component: CharacterFeedComponent;
  let fixture: ComponentFixture<CharacterFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
