import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { PageEvent } from '@angular/material';

import { GuildService } from '../../services/guild.service';

@Component({
	selector: 'app-rooster',
	templateUrl: './roster.component.html',
	styleUrls: ['./roster.component.css']
})
export class RosterComponent implements OnInit {
	members: any;
	filteredMembers: any = [];
	ranks = ['Cod-father', 'GM alt', 'Co-GM',
		'Senior officer', 'Officer', 'Veteran', 'Officer/Vet alt',
		'Core raider', 'Raider trial', 'Social'];

	queryParams = { character: '', rank: '-1' };
	page = {
		pageSize: 12,
		pageSizeOptions: [1, 6, 12, 24, 36, 48]
	};
	pageEvent: PageEvent = { pageIndex: 0, pageSize: this.page.pageSize, length: 1 };

	constructor(private guildService: GuildService, private sanitizer: DomSanitizer, private router: Router) {
		this.guildService
			.getMembers('Cake or pie')
			.then(response => {
				this.members = response.json().members;

				console.log(response.json());
				this.members.sort((a, b) =>
					a.character.achievementPoints > b.character.achievementPoints ? -1 : 1);
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
			return `http://render-eu.worldofwarcraft.com/character/${member.character.thumbnail}`;
		}
		return '';
	}

	getSpecIcon(member: any): string {
		if (member.character.spec) {
			return `https://blzmedia-a.akamaihd.net/wow/icons/56/${member.character.spec.icon}.jpg`;
		}
		return '';
	}

	getMembers() {
		console.log(this.queryParams);
		if (this.queryParams.character.length === 0) {
			if (this.queryParams.rank !== '-1') {
				// this.pagignation.current = 1;
				this.filteredMembers = [];
				this.members.forEach(m => {
					if (parseInt(this.queryParams.rank, 10) === m.rank) {
						this.filteredMembers.push(m);
					}
				});
				return this.filteredMembers;
			}
			return this.members;
		} else {
			// this.pagignation.current = 1;
			this.filteredMembers = [];
			this.members.forEach(m => {
				if (m.character.name.toLowerCase().indexOf(this.queryParams.character.toLowerCase()) > -1 &&
					this.queryParams.rank === '-1' || parseInt(this.queryParams.rank, 10) === m.rank) {
					this.filteredMembers.push(m);
				}
			});
			return this.filteredMembers;
		}
	}

	goToCharacter(realm: string, character: string): void {
		this.router.navigateByUrl(`roster/${realm}/${character}`);
	}
}
