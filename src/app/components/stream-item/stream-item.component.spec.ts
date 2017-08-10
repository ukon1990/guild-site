import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../../modules/material.module';

import { StreamItemComponent } from './stream-item.component';

describe('StreamItemComponent', () => {
	let component: StreamItemComponent;
	let fixture: ComponentFixture<StreamItemComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [StreamItemComponent],
			imports: [MaterialModule]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(StreamItemComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should be created', () => {
		expect(component).toBeTruthy();
	});
});
