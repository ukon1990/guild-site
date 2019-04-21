import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterProgressionComponent } from './character-progression.component';

describe('CharacterProgressionComponent', () => {
  let component: CharacterProgressionComponent;
  let fixture: ComponentFixture<CharacterProgressionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterProgressionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterProgressionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
