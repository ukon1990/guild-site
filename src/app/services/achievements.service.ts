import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import { AchievementListItem } from '../models/achievement';
import { Private } from '../models/private';

@Injectable()
export class AchievementsService {
	// https://eu.api.battle.net/wow/data/character/achievements
	// https://eu.api.battle.net/wow/character/test-realm/Peratryn?fields=achievements
	private baseUrl = `https://${
		Private.region
		}.api.battle.net/wow/data/character/achievements?locale=en_GB&apikey=${
			Private.blizzardApiKey}`;

	achievements: AchievementListItem[] = [];

	constructor(private _http: HttpClient) { }

	getAchievements(): Promise<any> {
		return this._http.get('assets/mock/achievements.json').toPromise();
	}
}
