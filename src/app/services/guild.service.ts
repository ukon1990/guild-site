import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class GuildService {
	private region = 'eu';
	private realm = 'emerald-dream';
	private apiKey = 'ugwc5qde7n5svga5yh7fwwxsjqtsdcws';
	private baseUrl = `https://${this.region}.api.battle.net/wow/guild/${this.realm}/`;
	private urlEnd = `?locale=en_GB&apikey=${this.apiKey}`;

	// Statics
	logs: Promise<any>;
	achievments: Promise<any>;
	roster: Promise<any>;
	challenges: Promise<any>;
	news: Promise<any>;
	zones: Promise<any>;

	constructor (private http: Http, private httpClient: HttpClient) { }

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
		if (this.challenges) {
			return this.challenges;
		} else {
			this.challenges = this.httpClient
			.get(
				`${
					this.baseUrl
				}${
					guildName
				}${
					this.urlEnd
				}&fields=challenge`
			).toPromise();
			return this.challenges;
		}
	}

	getNews(guildName: string): Promise<any> {
		if (this.news) {
			return this.news;
		} else {
			this.news = this.http
				.get(
					`${
						this.baseUrl
					}${
						guildName
					}${
						this.urlEnd
					}&fields=news`
				).toPromise();
			return this.news;
		}
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
			.get(`http://guild.jonaskf.net/assets/api/GetGuildRank.php`).toPromise();
	}

	getGuildLogs(realm: string, guild: string): Promise<any> {
		if (this.logs) {
			return this.logs;
		} else {
			this.logs = this.httpClient
				.get(
					`https://www.warcraftlogs.com:443/v1/reports/guild/${
						guild
					}/${
						realm
					}/eu?api_key=4508059150144d5b3159184e77c51070`// ,quests,professions
				).toPromise();
			return this.logs;
		}
	}

	getGuildLogFights(report: string) {
		if (this.logs) {
			return this.logs;
		} else {
			this.logs = this.httpClient
				.get(
					`https://www.warcraftlogs.com:443/v1/report/fights/${
						report
					}?api_key=4508059150144d5b3159184e77c51070`// ,quests,professions
				).toPromise();
			return this.logs;
		}
	}

	getLogZones() {
		if (this.zones) {
			return this.zones;
		} else {
			this.zones = this.httpClient
				.get(
					`https://www.warcraftlogs.com/v1/zones?api_key=4508059150144d5b3159184e77c51070`// ,quests,professions
				).toPromise();
			return this.zones;
		}
	}
}
