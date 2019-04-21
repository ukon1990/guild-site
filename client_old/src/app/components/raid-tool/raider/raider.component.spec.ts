import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaiderComponent } from './raider.component';

describe('RaiderComponent', () => {
  let component: RaiderComponent;
  let fixture: ComponentFixture<RaiderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaiderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaiderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
