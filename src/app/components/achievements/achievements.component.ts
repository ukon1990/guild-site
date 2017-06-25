import { Component, OnInit } from '@angular/core';
import { GuildService } from '../../services/guild.service';

declare const $WowheadPower: any;
@Component({
	selector: 'app-achievements',
	templateUrl: './achievements.component.html',
	styleUrls: ['./achievements.component.css']
})
export class AchievementsComponent implements OnInit {
	achievements: any[] = [];

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
				$WowheadPower.init();
				console.log(tmp);
			})
			.catch(error => {
				console.log(error);
			});
	}

	ngOnInit() {
	}

}
