import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CharacterService {
	private region = 'eu';
	private realm = 'emerald-dream';
	private apiKey = 'ugwc5qde7n5svga5yh7fwwxsjqtsdcws';
	private baseUrl = `https://${this.region}.api.battle.net/wow/character/`;
	private urlEnd = `?locale=en_GB&apikey=${this.apiKey}`;

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
				}&fields=items,feed,achievements,progression,audit,talents,statistics,reputation,pvp`// ,quests,professions
			).toPromise();
	}

	getCharacterLogs(realm: string, character: string, metric: string): Promise<any> {
		// https://www.warcraftlogs.com:443/v1/parses/character/stinson/emerald-dream/eu?api_key=4508059150144d5b3159184e77c51070
		return this.httpClient
			.get(
				`https://www.warcraftlogs.com:443/v1/parses/character/${
					character
				}/${
					realm
				}/eu?metric=${
					metric
				}&api_key=4508059150144d5b3159184e77c51070`// ,quests,professions
			).toPromise();
	}
}
