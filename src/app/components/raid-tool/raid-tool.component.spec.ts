import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaidToolComponent } from './raid-tool.component';

describe('RaidToolComponent', () => {
  let component: RaidToolComponent;
  let fixture: ComponentFixture<RaidToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaidToolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaidToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
