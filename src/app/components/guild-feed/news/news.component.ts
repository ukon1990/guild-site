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
		pageSize: 9,
		pageSizeOptions: [6, 9, 12, 24, 36, 48]
	};
	pageEvent: PageEvent = { pageIndex: 0, pageSize: this.page.pageSize, length: 1 };

	constructor(private guildService: GuildService) {
		this.guildService
			.getNews('Cake or pie')
			.then(response => {
				this.news = this.sortedNews(response.news)
				console.log(this.news);
				this.init();
			})
			.catch(error => {
				console.log(error);
			});
		setInterval( () => {
			this.guildService
				.getNews('Cake or pie', true)
					.then(n => {
						this.news = this.sortedNews(n.news);
						this.init();
					})
					.catch(e => console.log(e));
		}, 10000 );
	}

	sortedNews(news: any[]): any[] {
		return news.sort((a, b) => a.timestamp > b.timestamp ? -1 : 1);
	}

	ngOnInit() {
		this.init();
	}

	bonusList(bonusList: any[]): string {
		return bonusList.join(':');
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

	getContext(news: any): string {
		switch (news.context) {
			case 'raid-finder':
				return 'LFR';
			case 'raid-normal':
				return 'Normal raid';
			case 'raid-heroic':
				return 'Heroic raid';
			case 'raid-mythic':
				return 'Mythic raid';
			case 'black-market':
				return 'Black market';
			case 'challenge-mode':
				return 'Challenge mode';
			case 'challenge-mode-jackpot':
				return 'Challenge mode';
			case 'dungeon-normal':
				return 'Dungeon';
			case 'dungeon-heroic':
				return 'Heroic dungeon';
			case 'dungeon-mythic':
				return 'Mythic dungeon';
			case 'pvp-ranked':
				return 'Ranked PvP';
			case 'pvp-ranked-3':
				return 'Ranked PvP';
			case 'pvp-ranked-5':
				return 'Ranked PvP';
			case 'pvp-ranked-8':
				return 'Ranked PvP';
			case 'pvp-unranked':
				return 'PvP';
			case 'pvp-unranked-3':
				return 'PvP';
			case 'pvp-unranked-5':
				return 'PvP';
			case 'pvp-unranked-8':
				return 'PvP';
			case 'quest-reward':
				return 'Quest';
			case 'trade-skill':
				return 'Trade skill';
			case 'vendor':
				return 'Vendor';
			case 'world-quest-1':
				return 'World quest';
			case 'world-quest-2':
				return 'World quest';
			case 'world-quest-3':
				return 'World quest';
			case 'world-quest-10':
				return 'World quest';
			default:
				return news.context;
		}
	}
}
