import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { ChallengeRecord, ChallengeTime, Challenge } from 'app/models/challenge';
import { ColumnDescription } from '../../../../models/column-description';

@Component({
	selector: 'app-character-challenges',
	templateUrl: './character-challenges.component.html',
	styleUrls: ['./character-challenges.component.css']
})
export class CharacterChallengesComponent implements OnInit, OnChanges {
	@Input() challenges: Challenge;
	records = new Array<any>();

	columns: Array<ColumnDescription> = [
		{ key: 'name', title: 'Name', dataType: 'name' },
		{ key: 'inTime', title: 'In time', dataType: '' },
		{ key: 'bestTime', title: 'Best time', dataType: 'time' },
		{ key: 'lastTime', title: 'Last time', dataType: 'time' },
		{ key: 'guildRank', title: 'Guild rank', dataType: '' },
		{ key: 'realmRank', title: 'Realm rank', dataType: '' }
	];

	readonly expansions = [
		{title: 'Legion', from: 12, to: 0},
		{title: 'Warlords of Draenor', from: 20, to: 12},
		{title: 'Mists of Pandaria', from: 28, to: 20}
	];
	constructor(private sanitizer: DomSanitizer) { }

	ngOnInit() {
	}

	ngOnChanges(change): void {
		console.log(change);
		if (change.challenges && change.challenges.currentValue) {
			this.recordToRecordTable(change.challenges.currentValue.records);
		}
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

	recordToRecordTable(records: Array<ChallengeRecord>): void {
		this.records.length = 0;
		records.forEach(r => {
			if (r.bestTime && r.lastTime) {
				this.records.push({
					name: r.map.name,
					bestTime: r.bestTime.time,
					lastTime: r.lastTime.time,
					inTime: r.bestTime.time <= r.map.bronzeCriteria.time ? 'Yes' : 'No',
					realmRank: r.realmRank ? '' + r.realmRank : 'Unranked',
					guildRank: r.guildRank ? '' + r.guildRank : 'Unranked'
				});
			}
		});
	}
}
