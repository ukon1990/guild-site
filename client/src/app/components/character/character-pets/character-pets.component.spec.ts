import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterPetsComponent } from './character-pets.component';

describe('CharacterPetsComponent', () => {
  let component: CharacterPetsComponent;
  let fixture: ComponentFixture<CharacterPetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterPetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterPetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
