import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaidProgressBarComponent } from './raid-progress-bar.component';

describe('RaidProgressBarComponent', () => {
  let component: RaidProgressBarComponent;
  let fixture: ComponentFixture<RaidProgressBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaidProgressBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaidProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
