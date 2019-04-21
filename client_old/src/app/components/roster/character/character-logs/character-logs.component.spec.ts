import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterLogsComponent } from './character-logs.component';

describe('CharacterLogsComponent', () => {
  let component: CharacterLogsComponent;
  let fixture: ComponentFixture<CharacterLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterLogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
