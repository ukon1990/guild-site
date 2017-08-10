import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../../modules/material.module';

import { StreamsComponent } from './streams.component';

describe('StreamsComponent', () => {
	let component: StreamsComponent;
	let fixture: ComponentFixture<StreamsComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [StreamsComponent],
			imports: [MaterialModule]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(StreamsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should be created', () => {
		expect(component).toBeTruthy();
	});
});
