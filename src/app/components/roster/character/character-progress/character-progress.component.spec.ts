import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterProgressComponent } from './character-progress.component';

describe('CharacterProgressComponent', () => {
  let component: CharacterProgressComponent;
  let fixture: ComponentFixture<CharacterProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
