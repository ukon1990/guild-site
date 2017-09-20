import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import { AchievementListItem } from '../models/achievement';

@Injectable()
export class AchievementsService {
	// https://eu.api.battle.net/wow/data/character/achievements
	// https://eu.api.battle.net/wow/character/test-realm/Peratryn?fields=achievements
	private region = 'eu';
	private realm = 'draenor';
	private apiKey = 'ugwc5qde7n5svga5yh7fwwxsjqtsdcws';
	private baseUrl = `https://${
		this.region}.api.battle.net/wow/data/character/achievements?locale=en_GB&apikey=${this.apiKey}`;

	achievements: AchievementListItem[] = [];

	constructor(private _http: HttpClient) { }

	getAchievements(): Promise<any> {
		return this._http.get('assets/mock/achievements.json').toPromise();
	}
}
