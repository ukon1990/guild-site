import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterLogItemComponent } from './character-log-item.component';

describe('CharacterLogItemComponent', () => {
  let component: CharacterLogItemComponent;
  let fixture: ComponentFixture<CharacterLogItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterLogItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterLogItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
