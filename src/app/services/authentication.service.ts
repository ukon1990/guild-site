import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

@Injectable()
export class AuthenticationService {
	userProfileUrl = 'https://<region>.api.battle.net/wow/user/characters';
	client_id = '';
	client_secret = '';
	scope = 'wow.profile';
	state = '';
	redirect_uri = 'http://localhost:4200';
	response_type = 'application/json';

	constructor(private httpClient: HttpClient) { }

	/*
	autherize(region: string) {
		let url = 'https://';
		switch (region) {
			case 'cn':
				url += 'https://www.battlenet.com.cn/oauth/authorize';
				break;
			default:
				url += `https://${region}.battle.net/oauth/authorize`;
				break;
		}
		return this.httpClient.post(url);
	}*/

	login(region: string): Observable<Object> {
		let url = 'https://';
		switch (region) {
			case 'cn':
				url += 'https://www.battlenet.com.cn/oauth/authorize';
				break;
			default:
				url += `https://${region}.battle.net/oauth/authorize`;
				break;
		}
		return this.httpClient
			.get(`https://eu.battle.net/oauth/authorize?grant_type=client_credentials&client_id=${
				this.client_id
				}&client_secret=${
					this.client_secret
				}&scope=wow.profile`);
	}

	getProfile(region: string, user: any) {
		// 	https://eu.api.battle.net/wow/user/characters
		let url = '';
		switch (region) {
			case 'cn':
				url += 'https://www.battlenet.com.cn/oauth/authorize';
				break;
			default:
				url += `https://${region}.battle.net/oauth/authorize`;
				break;
		}
	}
}
