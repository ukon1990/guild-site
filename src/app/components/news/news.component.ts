import { Component, OnInit } from '@angular/core';
import { GuildService } from '../../services/guild.service';

declare const $WowheadPower: any;
@Component({
	selector: 'app-news',
	templateUrl: './news.component.html',
	styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
	news: any;

	constructor(private guildService: GuildService) {
		this.guildService
			.getNews('Cake or pie')
			.then(response => {
				this.news = response.json().news;
				console.log(this.news);
				$WowheadPower.init();
			})
			.catch(error => {
				console.log(error);
			});
	}

	ngOnInit() {
	}

	bonusList(bonusList: any[]): string {
		return bonusList.join(':');
	}
}
