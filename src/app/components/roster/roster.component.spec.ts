import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoosterComponent } from './rooster.component';

describe('RoosterComponent', () => {
  let component: RoosterComponent;
  let fixture: ComponentFixture<RoosterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoosterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
