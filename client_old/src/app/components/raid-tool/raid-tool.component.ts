import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { GuildService } from '../../services/guild.service';
import { guildRanks } from '../../models/guild-ranks';
import { ColumnDescription } from '../../models/column-description';
import { Character } from '../../models/character';
import { CharacterService } from '../..//services/character.service';
import { classes } from '../../models/classes';
import { metrics } from '../../models/log-vars';
import { Raider } from '../../models/raider';

@Component({
	selector: 'app-raid-tool',
	templateUrl: './raid-tool.component.html',
	styleUrls: ['./raid-tool.component.css']
})
export class RaidToolComponent implements OnInit {
	columns: Array<ColumnDescription> = [
		{ key: 'name', title: 'Name', dataType: 'name' },
		{ key: 'role', title: 'Role', dataType: 'role' },
		{ key: 'class', title: 'Class', dataType: 'class' },
		{ key: 'spec', title: 'Spec', dataType: 'spec' },
		{ key: 'itemLevel', title: 'iLVL', dataType: 'itemLevel' },
		{ key: 'best_historical_percent', title: '%', dataType: 'percent' },
		{ key: 'best_persecondamount', title: 'DPS/HPS', dataType: 'number' },
		{ key: 'best_allstar_points', title: '*', dataType: 'number' },
		{ key: 'lastModified', title: 'Last modified', dataType: 'date' },
		{ key: '', title: 'Profile', dataType: 'raider-profile' }
	];
	members;
	characters = new Array<Character>();
	raiders: Array<Raider> = new Array<Raider>();
	raidersMap: Map<string, Raider> = new Map<string, Raider>();

	ranks = guildRanks;
	includedRanks: Array<number> = new Array<number>();
	form: FormGroup;
	zones;
	metrics = metrics;
	encounters;
	difficulty = [
		{ id: 1, name: 'LFR' },
		{ id: 3, name: 'Normal' },
		{ id: 4, name: 'Heroic' },
		{ id: 5, name: 'Mythic' }
	];
	classCount = new Array<any>();
	classCountMap = new Map<string, any>();
	roleCount;

	constructor(private guildService: GuildService, private characterService: CharacterService, private formBuilder: FormBuilder) {
		this.form = this.formBuilder.group({
			difficulty: 4,
			zone: 1,
			encounter: -1
		});
	}

	async ngOnInit() {
		await this.guildService.getMembers()
			.then(m => {
				this.members = m.json().members;

				this.updateCharacterList();
				this.updateClassSpecInfo();
			})
			.catch(error => console.error('Unable to get guild members', error));

		await this.characterService.getLogZones()
			.then(zones => {
				this.zones = zones.reverse();
			}).catch(error => console.error(error));

		await this.getAllLogs();
	}

	async getAllLogs() {
		this.raiders.forEach(r => {

			this.getLogsForPlayer(r);
		});
	}

	updateClassSpecInfo(): void {
		this.classCount = new Array<any>();
		this.classCountMap = new Map<string, any>();

		this.raiders.forEach(r => {
			if (!this.classCountMap[r.class]) {
				const c =  { class: r.class, count: 1, specMap: [], spec: [] };
				this.classCount.push(c);
				this.classCountMap[c.class] = c;
			} else {
				this.classCountMap[r.class].count++;
			}

			if (this.classCountMap[r.class].specMap[r.spec]) {
				this.classCountMap[r.class].specMap[r.spec].count++;
			} else {
				this.classCountMap[r.class].specMap[r.spec] = { name: r.spec, count: 1, role: r.role.toLowerCase() };
				this.classCountMap[r.class].spec.push(this.classCountMap[r.class].specMap[r.spec]);
			}
		});
	}

	getLogsForPlayer(raider: Raider): void {
		raider.downloading.logs = true;
		this.characterService.getCharacterLogs(
			raider.realm,
			raider.name,
			this.getMetricForRole(raider),
			this.zones[this.form.value.zone].id
		).then(logs => {
			raider.logs = logs;
			this.setRelevantLog(raider);
			raider.downloading.logs = false;
		})
			.catch(e => {
				console.error('Error:', e);
				raider.downloading.logs = false;
			});
	}

	getMetricForRole(raider: Raider): string {
		switch (raider.role) {
			case 'TANK':
				return metrics[0].value;
			case 'HEALING':
				return metrics[1].value;
			default:
				return metrics[2].value;
		}
	}

	updateRelevantLogs(): void {
		this.raiders.forEach(raider => {
			this.setRelevantLog(raider);
		});
	}

	setRelevantLog(raider: Raider): void {
		let relevantLogCount = 0;
		raider.best_allstar_points = 0;
		raider.best_historical_percent = 0;
		raider.best_persecondamount = 0;

		raider.logs.forEach(log => {
			if (log.difficulty === this.form.value.difficulty) {
				if (this.form.value.encounter === -1) {
					relevantLogCount++;
					log.specs.forEach(spec => {
						if (spec.spec === raider.spec) {
							raider.best_allstar_points += spec.best_allstar_points;
							raider.best_historical_percent += spec.best_historical_percent;
							raider.best_persecondamount += spec.best_persecondamount;
						}
					});
				} else if (log.name === this.zones[this.form.value.zone].encounters[this.form.value.encounter].name) {
					log.specs.forEach(spec => {
						if (spec.spec === raider.spec) {
							raider.best_allstar_points = spec.best_allstar_points;
							raider.best_historical_percent = spec.best_historical_percent;
							raider.best_persecondamount = spec.best_persecondamount;
						}
					});
				}
			}
		});

		if (this.form.value.encounter === -1 && relevantLogCount > 0) {
			raider.best_allstar_points = raider.best_allstar_points / relevantLogCount;
			raider.best_historical_percent = raider.best_historical_percent / relevantLogCount;
			raider.best_persecondamount = raider.best_persecondamount / relevantLogCount;
		}
	}

	updateCharacterList(): void {
		const classMap = new Map<string, any>();
		this.members.forEach(m => {
			if (m.character.level === 110 &&
				(m.rank === 0 || m.rank === 1|| m.rank === 3 || m.rank === 4 || m.rank === 6 || m.rank === 9)) {
				const id = `${m.character.realm}-${m.character.name}`,
					raider: Raider = new Raider(m.character);
				this.raidersMap[id] = raider;
				this.raiders.push(raider);
				raider.downloading.character = true;

				if (!m.items) {
					this.characterService.getCharacter(m.character.realm, m.character.name)
						.then(character => {
							character = character.json();

							character.talents.forEach(t => {
								if (t.selected) {
									raider.role = t.spec.role;
									raider.spec = t.spec.name;
								}

								if (t.spec) {
									raider.specs.push(t.spec);
								}
							});
							m.character = character;
							raider.itemLevel = character.items.averageItemLevelEquipped;
							raider.lastModified = character.lastModified;
							raider.downloading.character = false;
						})
						.catch(e => {
							console.error('Could not download char', e);
							raider.downloading.character = false;
						});
				}

				this.characters.push(m.character);
				if (classMap[classes[m.character.class]]) {
					classMap[classes[m.character.class]].count++;
				} else {
					classMap[classes[m.character.class]] = {
						count: 1
					};
				}
			}
		});
	}
}