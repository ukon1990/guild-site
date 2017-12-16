import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { ChallengeRecord, ChallengeTime } from 'app/models/challenge';

@Component({
	selector: 'app-character-challenges',
	templateUrl: './character-challenges.component.html',
	styleUrls: ['./character-challenges.component.css']
})
export class CharacterChallengesComponent implements OnInit {
	@Input() challenges;

	readonly expansions = [
		{title: 'Legion', from: 12, to: 0},
		{title: 'Warlords of Draenor', from: 20, to: 12},
		{title: 'Mists of Pandaria', from: 28, to: 20}
	];
	constructor(private sanitizer: DomSanitizer) { }

	ngOnInit() {
	}

	getTimeToString(t?: ChallengeTime): string {
		if (!t) {
			return '00:00:00';
		}
		return `${t.hours}:${t.minutes}:${t.seconds}`;
	}

	getImageUrl(slug: string) {
		if (slug) {
			const url = 'assets/images/dungeons/' + slug + '.jpg';
			return this.sanitizer.bypassSecurityTrustStyle('url(' + url + ') !important;');
		}
		return '';
	}
}
