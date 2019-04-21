import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Private } from '../models/private';

@Injectable()
export class GuildService {
	private baseUrl = `https://${Private.region}.api.battle.net/wow/guild/${Private.realm}/`;
	private urlEnd = `?locale=en_GB&apikey=${Private.blizzardApiKey}`;

	// Statics
	logs: Promise<any>;
	achievments: Promise<any>;
	roster: Promise<any>;
	challenges: Promise<any>;
	zones: Promise<any>;

	constructor (private http: Http, private httpClient: HttpClient) { }

	getAllGuildData(): Promise<any> {
		return this.http
			.get(
				`${
					this.baseUrl
				}${
					Private.guildName
				}${
					this.urlEnd
				}`// &fields=achievements,challenge,news,members
			).toPromise();
	}

	getAchievements(): Promise<any> {
		return this.http
			.get(
				`${
					this.baseUrl
				}${
					Private.guildName
				}${
					this.urlEnd
				}&fields=achievements`
			).toPromise();
	}

	getChallenges(): Promise<any> {
		if (this.challenges) {
			return this.challenges;
		} else {
			this.challenges = this.httpClient
			.get(
				`${
					this.baseUrl
				}${
					Private.guildName
				}${
					this.urlEnd
				}&fields=challenge`
			).toPromise();
			return this.challenges;
		}
	}

	getNews(refresh?: boolean): Promise<any> {
		return this.httpClient
				.get(
					`${
						this.baseUrl
					}${
						Private.guildName
					}${
						this.urlEnd
					}&fields=news`
				).toPromise();
	}

	getMembers(): Promise<any> {
		return this.http
			.get(
				`${
					this.baseUrl
				}${
					Private.guildName
				}${
					this.urlEnd
				}&fields=members`
			).toPromise();
	}

	getGuildRank(): Promise<any> {
		return this.httpClient
			.get(`http://guild.jonaskf.net/assets/api/GetGuildRank.php?region=${
				Private.region
			}&realm=${
				Private.realm
			}&guild=${
				Private.guildName
			}`).toPromise();
	}

	getGuildLogs(): Promise<any> {
		if (this.logs) {
			return this.logs;
		} else {
			this.logs = this.httpClient
				.get(
					`https://www.warcraftlogs.com:443/v1/reports/guild/${
						Private.guildName
					}/${
						Private.realm
					}/${
						Private.region
					}?api_key=${
						Private.warcraftLogsApiKey
					}`// ,quests,professions
				).toPromise();
			return this.logs;
		}
	}

	getGuildLogFights(report: string) {
		return this.httpClient
			.get(
				`https://www.warcraftlogs.com:443/v1/report/fights/${
					report
				}?api_key=${
					Private.warcraftLogsApiKey
				}`
			).toPromise();
	}

	getLogZones() {
		if (this.zones) {
			return this.zones;
		} else {
			this.zones = this.httpClient
				.get(
					`https://www.warcraftlogs.com/v1/zones?api_key=${
						Private.warcraftLogsApiKey
					}`// ,quests,professions
				).toPromise();
			return this.zones;
		}
	}
}
