import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CharacterService {
	private region = 'eu';
	private realm = 'emerald-dream';
	private apiKey = 'ugwc5qde7n5svga5yh7fwwxsjqtsdcws';
	private baseUrl = `https://${this.region}.api.battle.net/wow/character/`;
	private urlEnd = `?locale=en_GB&apikey=${this.apiKey}`;

	constructor(private http: Http) { }

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
}
