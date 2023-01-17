import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuildActivityComponent } from './guild-activity.component';

describe('GuildActivityComponent', () => {
  let component: GuildActivityComponent;
  let fixture: ComponentFixture<GuildActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuildActivityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuildActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
