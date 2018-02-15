import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Private } from '../models/private';

@Injectable()
export class CharacterService {
	private baseUrl = `https://${Private.region}.api.battle.net/wow/character/`;
	private urlEnd = `?locale=en_GB&apikey=${Private.blizzardApiKey}`;

	logs: Promise<any>;

	constructor(private http: Http, private httpClient: HttpClient) { }

	getCharacter(realm: string, character: string): Promise<any> {
		return this.http
			.get(
				`${
					this.baseUrl
				}${
					realm
				}/${
					character
				}${
					this.urlEnd
				}&fields=items,feed,achievements,progression,audit,talents,statistics,reputation,pvp,challenge`// ,quests,professions
			).toPromise();
	}

	getCharacterLogs(realm: string, character: string, metric: string, zone: string): Promise<any> {
		return this.httpClient
			.get(
				`https://www.warcraftlogs.com:443/v1/parses/character/${
					character
				}/${
					realm
				}/eu?metric=${
					metric
				}${
					zone && zone !== ''  ? '&zone=' + zone : ''
				}&api_key=${
					Private.warcraftLogsApiKey
				}`
			).toPromise();
	}

	getLogZones(): Promise<any> {
		if (this.logs) {
			return this.logs;
		}
		return this.httpClient.get(`https://www.warcraftlogs.com/v1/zones?api_key=${
			Private.warcraftLogsApiKey
		}`).toPromise();
	}
}
