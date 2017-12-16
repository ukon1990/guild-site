import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import { GuildService } from '../../services/guild.service';
import { LogsComponent } from '../logs/logs.component';

@Component({
	selector: 'app-rooster',
	templateUrl: './roster.component.html',
	styleUrls: ['./roster.component.css']
})
export class RosterComponent implements OnInit {
	form: FormGroup;
	filteredMembers: Observable<any[]>;
	filteredCount: number;
	members: any;
	ranks = ['Guild master', 'Officer', 'Officer alt', 'Raid team',
		'Raid team', 'Alt', 'Trial'];

	queryParams = { character: '', rank: '-1' };
	page = {
		pageSize: 12,
		pageSizeOptions: [1, 6, 12, 24, 36, 48]
	};
	pageEvent: PageEvent = { pageIndex: 0, pageSize: this.page.pageSize, length: 1 };

	constructor(
		private guildService: GuildService,
		private sanitizer: DomSanitizer,
		private router: Router,
		private formBuilder: FormBuilder) {
		this.form = formBuilder.group({
			rank: -1,
			name: ''
		});
		this.filteredMembers = this.form.valueChanges
			.startWith(null)
			.map( ( query ) => {
				this.filteredCount = 0;
				return query !== null ? this.members.filter( m => {
					if (m.character.name.toLowerCase().indexOf(query.name.toLowerCase()) > -1
						&& (parseInt(query.rank, 10) === -1 || m.rank === parseInt(query.rank, 10))) {
						this.filteredCount++;
						return true;
					}
				}) : this.members;
			});
		this.guildService
			.getMembers('Cannon Fodder')
			.then(response => {
				this.members = response.json().members;

				console.log(response.json());
				this.members.sort((a, b) =>
					a.character.achievementPoints > b.character.achievementPoints ? -1 : 1);
				this.form.controls.name.setValue('');
			})
			.catch(error => {
				console.log(error);
			});
	}

	ngOnInit() {
	}

	getBGImageUrl(spec: string) {
		if (spec) {
			const url = 'assets/images/specs/' + spec + '.png';
			return this.sanitizer.bypassSecurityTrustStyle('url(' + url + ')');
		}
		return '';
	}

	getRank(id) {
		return this.ranks[id];
	}

	getThumbnail(member: any) {
		if (member.character.thumbnail && member.character.thumbnail !== 'unknown/unknown-avatar.jpg') {
			return this.sanitizer.bypassSecurityTrustStyle(
				`url(http://render-eu.worldofwarcraft.com/character/${member.character.thumbnail})`);
		}
		return '';
	}

	getSpecIcon(member: any): string {
		if (member.character.spec) {
			return `https://blzmedia-a.akamaihd.net/wow/icons/56/${member.character.spec.icon}.jpg`;
		}
		return '';
	}

	goToCharacter(realm: string, character: string): void {
		this.router.navigateByUrl(`roster/${realm}/${character}`);
	}
}
