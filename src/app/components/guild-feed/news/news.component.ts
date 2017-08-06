import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';

import { GuildService } from '../../../services/guild.service';

declare const $WowheadPower: any;
@Component({
	selector: 'app-news',
	templateUrl: './news.component.html',
	styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
	news: any;
	page = {
		pageSize: 12,
		pageSizeOptions: [12, 24, 36, 48]
	};
	pageEvent: PageEvent = { pageIndex: 0, pageSize: this.page.pageSize, length: 1 };

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

	changePage(event: PageEvent) {
		this.pageEvent = event;
		$WowheadPower.init();
	}
}
