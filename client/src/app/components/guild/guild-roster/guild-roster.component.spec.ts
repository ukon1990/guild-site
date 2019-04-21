import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuildRosterComponent } from './guild-roster.component';

describe('GuildRosterComponent', () => {
  let component: GuildRosterComponent;
  let fixture: ComponentFixture<GuildRosterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuildRosterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuildRosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
