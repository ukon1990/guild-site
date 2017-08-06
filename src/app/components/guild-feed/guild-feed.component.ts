import { Component, OnInit } from '@angular/core';
import { GuildService } from '../../services/guild.service';

declare const $WowheadPower: any;
@Component({
	selector: 'app-guild-feed',
	templateUrl: './guild-feed.component.html',
	styleUrls: ['./guild-feed.component.css']
})
export class GuildFeedComponent implements OnInit {
	guild: any;

	constructor(private guildService: GuildService) {}

	ngOnInit() {
	}

	onTabChanged(event): void {
		if ($WowheadPower) {
			$WowheadPower.init();
		}
	}
}
