import { Component, OnInit } from '@angular/core';
import { GuildService } from './services/guild.service';
import { AchievementsService } from './services/achievements.service';

declare const GuildTabard: any;
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	guildName = 'Cake or Pie';
	guild: any;

	constructor(private guildService: GuildService, private achievementsService) {
		this.guildService
			.getAllGuildData(this.guildName)
			.then(response => this.guild = response.json())
			.catch(error => {
				console.log(error);
			});
		this.achievementsService.getAchievements()
			.then( response =>
				{this.achievementsService.achievements = response.achievements; console.log(this.achievementsService.achievements );})
			.catch( error => console.log(error));
	}

	ngOnInit() {
	}
}
