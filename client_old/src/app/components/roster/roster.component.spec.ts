import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../../modules/material.module';

import { RosterComponent } from './roster.component';

describe('RosterComponent', () => {
	let component: RosterComponent;
	let fixture: ComponentFixture<RosterComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [RosterComponent],
			imports: [MaterialModule]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(RosterComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should be created', () => {
		expect(component).toBeTruthy();
	});
});
