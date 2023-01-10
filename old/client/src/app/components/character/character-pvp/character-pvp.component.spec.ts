import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterPvpComponent } from './character-pvp.component';

describe('CharacterPvpComponent', () => {
  let component: CharacterPvpComponent;
  let fixture: ComponentFixture<CharacterPvpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterPvpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterPvpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
