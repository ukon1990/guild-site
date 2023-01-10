import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuildNewsComponent } from './guild-news.component';

describe('GuildNewsComponent', () => {
  let component: GuildNewsComponent;
  let fixture: ComponentFixture<GuildNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuildNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuildNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
