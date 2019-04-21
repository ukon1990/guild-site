import { Component, OnInit } from '@angular/core';
import { GuildService } from './services/guild.service';
import { AchievementsService } from './services/achievements.service';
import { AuthenticationService } from './services/authentication.service';
import { Private } from './models/private';

declare const GuildTabard: any;
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	guildName = Private.guildName;
	guild: any;

	constructor(
		private guildService: GuildService,
		private achievementsService: AchievementsService,
		private authService: AuthenticationService) {
		this.guildService
			.getAllGuildData()
			.then(response => this.guild = response.json())
			.catch(error => {
				console.log(error);
			});
		this.achievementsService.getAchievements()
			.then( response => {
				this.achievementsService.achievements = response.achievements;
				console.log(this.achievementsService.achievements );
			}).catch( error => console.log(error));
		// this.authService.login('eu').subscribe(response => console.log('Response', response));
	}

	ngOnInit() {
	}
}
