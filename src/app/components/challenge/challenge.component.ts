import { Component, OnInit } from '@angular/core';
import { GuildService } from '../../services/guild.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
	selector: 'app-challenge',
	templateUrl: './challenge.component.html',
	styleUrls: ['./challenge.component.css']
})
export class ChallengeComponent implements OnInit {
	challenges: any;
	guildName = 'Cake or Pie';

	constructor(private guildService: GuildService, private sanitizer: DomSanitizer) {
		this.guildService
			.getChallenges('Cake or pie')
			.then(response => {
				this.challenges = response.json().challenge.sort( (a, b) => a.map.id < b.map.id ? 1 : -1 );
				console.log(this.challenges);
			})
			.catch(error => {
				console.log(error);
			});
	}

	ngOnInit() {
	}

	getImageUrl(slug: string) {
		if (slug) {
			const url = 'assets/images/dungeons/' + slug + '.jpg';
			return this.sanitizer.bypassSecurityTrustStyle('url(' + url + ')');
		}
		return '';
	}

	hasBeatenChallenge(map, group) {
		if (map.goldCriteria.time > group.time.time) {
			return 'Gold';
		} else if (map.silverCriteria.time > group.time.time) {
			return 'Silver';
		} else if (map.bronzeCriteria.time > group.time.time) {
			return 'Bronze';
		} else {
			return 'None';
		}
	}

	getGuildies(members: any[]) {
		let guildMembers = '', count = 0;
		members.forEach((m: any) => {
			if (m.character && m.character.guild === this.guildName) {
				count++;
				guildMembers +=  (count > 1 ? ', ' : '') + m.character.name;
			}
		});
		return guildMembers;
	}
}
