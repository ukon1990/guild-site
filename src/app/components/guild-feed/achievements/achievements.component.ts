import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';
import { GuildService } from '../../../services/guild.service';

declare const $WowheadPower: any;
@Component({
	selector: 'app-achievements',
	templateUrl: './achievements.component.html',
	styleUrls: ['./achievements.component.css']
})
export class AchievementsComponent implements OnInit {
	achievements: any[] = [];
	page = {
		pageSize: 12,
		pageSizeOptions: [12, 24, 36, 48]
	};
	pageEvent: PageEvent = { pageIndex: 0, pageSize: this.page.pageSize, length: 1 };

	constructor(private guildService: GuildService) {
		this.guildService
			.getAchievements('Cake or pie')
			.then(response => {
				const tmp = response.json().achievements;
				for (let i = 0; i < tmp.achievementsCompleted.length; i++) {
					this.achievements.push({
						id: tmp.achievementsCompleted[i],
						timestamp: tmp.achievementsCompletedTimestamp[i]
					});
				}
				this.achievements.sort( (a: any, b: any) => a.timestamp < b.timestamp ? 1 : -1 );
				this.init();
				console.log(tmp);
			})
			.catch(error => {
				console.log(error);
			});
	}

	ngOnInit() {
		this.init();
	}

	changePage(event: PageEvent) {
		this.pageEvent = event;
		this.init();
	}

	init(): void {
		try {
			if ($WowheadPower) {
				$WowheadPower.init();
			}
		} catch (error) {
			console.log(error);
		}
	}
}
