import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GuildService } from '../../services/guild.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

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
	pagignation = { current: 1, pageCount: 0, pageLimit: 12 };

	constructor(private guildService: GuildService, private sanitizer: DomSanitizer, private router: Router) {
		this.guildService
			.getMembers('Cake or pie')
			.then(response => {
				this.members = response.json().members;

				this.pagignation.pageCount = this.members.length / this.pagignation.pageLimit;
				console.log(this.members);
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

	changePage(change) {
		if ((this.pagignation.current + change) >= 1 &&
			this.pagignation.pageCount > (this.pagignation.current + change)) {
			this.pagignation.current += change;
		}
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
