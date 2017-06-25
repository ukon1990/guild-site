import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class GuildService {
	private region = 'eu';
	private realm = 'emerald-dream';
	private apiKey = 'ugwc5qde7n5svga5yh7fwwxsjqtsdcws';
	private baseUrl = `https://${this.region}.api.battle.net/wow/guild/${this.realm}/`;
	private urlEnd = `?locale=en_GB&apikey=${this.apiKey}`;

	constructor (private http: Http) { }

	getAllGuildData(guildName: string): Promise<any> {
		return this.http
			.get(
				`${
					this.baseUrl
				}${
					guildName
				}${
					this.urlEnd
				}`// &fields=achievements,challenge,news,members
			).toPromise();
	}

	getAchievements(guildName: string): Promise<any> {
		return this.http
			.get(
				`${
					this.baseUrl
				}${
					guildName
				}${
					this.urlEnd
				}&fields=achievements`
			).toPromise();
	}

	getChallenges(guildName: string): Promise<any> {
		return this.http
			.get(
				`${
					this.baseUrl
				}${
					guildName
				}${
					this.urlEnd
				}&fields=challenge`
			).toPromise();
	}

	getNews(guildName: string): Promise<any> {
		return this.http
			.get(
				`${
					this.baseUrl
				}${
					guildName
				}${
					this.urlEnd
				}&fields=news`
			).toPromise();
	}

	getMembers(guildName: string): Promise<any> {
		return this.http
			.get(
				`${
					this.baseUrl
				}${
					guildName
				}${
					this.urlEnd
				}&fields=members`
			).toPromise();
	}

	getGuildRank(guildName: string): Promise<any> {
		return this.http
			.get(`https://www.wowprogress.com/guild/${this.region}/${this.realm}/${guildName}/json_rank`).toPromise();
	}
}
