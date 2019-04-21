import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuildFeedComponent } from './guild-feed.component';

describe('GuildFeedComponent', () => {
	let component: GuildFeedComponent;
	let fixture: ComponentFixture<GuildFeedComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [GuildFeedComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(GuildFeedComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should be created', () => {
		expect(component).toBeTruthy();
	});
});
