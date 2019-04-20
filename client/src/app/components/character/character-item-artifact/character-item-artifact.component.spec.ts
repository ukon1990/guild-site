import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterItemArtifactComponent } from './character-item-artifact.component';

describe('CharacterItemArtifactComponent', () => {
  let component: CharacterItemArtifactComponent;
  let fixture: ComponentFixture<CharacterItemArtifactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterItemArtifactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterItemArtifactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
