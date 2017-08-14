import { Component, Input, Output, OnChanges } from '@angular/core';
import { CharacterService } from '../../../../services/character.service';

@Component({
	selector: 'app-character-logs',
	templateUrl: './character-logs.component.html',
	styleUrls: ['./character-logs.component.css']
})
export class CharacterLogsComponent implements OnChanges {
	@Input() character: any;
	characterSpecialization: string;

	logs = {
		zones: [],
		1: {difficulty: 'LFR', logs: []},
		2: {difficulty: 'Flex', logs: []},
		3: {difficulty: 'Normal', logs: []},
		4: {difficulty: 'Heroic', logs: []},
		5: {difficulty: 'Mythic', logs: []},
		6: {difficulty: 'Unknown', logs: []},
		7: {difficulty: 'Unknown', logs: []},
		8: {difficulty: 'Unknown', logs: []},
		9: {difficulty: 'Unknown', logs: []},
		10: {difficulty: 'Challenge mode', logs: []}
	};
	metrics = [
		{value: 'krsi', name: 'Tank Survivability'},
		{value: 'hps', name: 'HPS'},
		{value: 'dps', name: 'DPS'},
		{value: 'bossdps', name: 'Boss DPS'},
		{value: 'tankhps', name: 'Tank HPS'},
		{value: 'playerspeed', name: 'Player speed'}
	];
	selection = {
		metric: 0,
		zone: '',
		isDownloading: false
	};

	constructor(private characterService: CharacterService) { }

	ngOnChanges() {
		if (this.character) {
			try {
				this.setMetricForSpec();
				this.getLogs();
			} catch (err) {}
		}
	}

	getLogs(): void {
		this.selection.isDownloading = true;
		// The zone list
		this.characterService.getLogZones()
			.then(zones => {
				this.logs.zones = zones.reverse();
			}).catch(error => console.log(error));

		// The characters logs
		this.characterService.getCharacterLogs(
				this.slugifyName(this.character.realm),
				this.character.name,
				this.metrics[this.selection.metric].value,
				this.selection.zone
			)
			.then(logs => {
				this.groupLogs(logs);
				this.selection.isDownloading = false;
			})
			.catch(error => {
				console.log(error);
				this.selection.isDownloading = false;
			});
	}
	groupLogs(logs: any[]): void {
		// Making sure the logs are cleared
		Object.keys(this.logs).forEach(k => {
			this.logs[k].logs = [];
		});
		logs.forEach(l => {
			this.logs[l.difficulty].logs.push(l);
		});
	}

	setMetricForSpec(): void {
		this.character.talents.forEach(spec => {
			if (spec.selected) {
				this.characterSpecialization = spec.spec.name;
				switch (spec.spec.role) {
					case 'TANK':
						this.selection.metric = 0;
						break;
					case 'HEALING':
						this.selection.metric = 1;
						break;
					default:
						this.selection.metric = 2;
						break;
				}
			}
		});
	}

	slugifyName(name: string): string {
		return name.replace(/[\' ]/i, '-');
	}
}
