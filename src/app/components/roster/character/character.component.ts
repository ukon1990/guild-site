import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { PageEvent } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment-timezone';
import { CharacterService } from '../../../services/character.service';
import { AchievementsService } from '../../../services/achievements.service';

declare const $WowheadPower: any;
@Component({
	selector: 'app-character',
	templateUrl: './character.component.html',
	styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit, OnDestroy {
	private sub: any;
	character: any = {name: '', realm: ''};
	achievementsService: AchievementsService;
	selectedAchivementGroupIndex = -1;


	page = {
		pageSize: 6,
		pageSizeOptions: [6, 12]
	};
	pageEvent: PageEvent = { pageIndex: 0, pageSize: this.page.pageSize, length: 1 };
	classBgColor: any  = {
		1: '#1a0407', // Warrior
		2: '#13040a', // Paladin
		3: '#0f091b', // Hunter
		4: '#160720"', // Rogue
		5: '#15060e', // Priest
		6: '#080812', // Death Knight
		7: '#050414', // Shaman
		8: '#110617', // Mage
		9: '#080516', // Warlock
		10: '#040b17', // Monk
		11: '#04100a', // Druid
		12: '#000900' // Demon hunter
	};

	constructor(private activatedRoute: ActivatedRoute, achievementsService: AchievementsService,
		private sanitizer: DomSanitizer, private characterService: CharacterService) {

		this.achievementsService = achievementsService;

		this.sub = this.activatedRoute.params.subscribe(p => {
			this.character.realm = p['realm'];
			this.character.name = p['character'];
			console.log('params', p);
			this.characterService.getCharacter(p['realm'], p['character'])
				.then(c => {
					this.character = c.json();
					console.log(this.character);
					this.character.progression.raids.reverse();
					/*
					this.character.lastModified = moment
						.tz(this.character.lastModified, 'UTC');
					*/
					this.init();
				})
				.catch(error => console.log(error));
		});
	}

	ngOnInit() {
		// this.onTabChanged(null);
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}

	getBackgroundImage() {
		if (this.character.thumbnail) {
			const url = `https://render-eu.worldofwarcraft.com/character/${
					this.character.thumbnail.replace('avatar', 'main')
				}`;
			return this.sanitizer.bypassSecurityTrustStyle('url(' + url + ')');
		}
		return '';
	}

	getBackgroundColor() {
		return this.sanitizer.bypassSecurityTrustStyle(
			this.character.class ? this.classBgColor[this.character.class] : 'black');
	}

	bonusList(bonusList: any[]): string {
		return bonusList.join(':');
	}


	onTabChanged(event): void {
		this.init();
	}

	unselectAchievementGroup(event): void {
		this.selectedAchivementGroupIndex = -1;
	}

	selectAchievementGroup(index: number) {
		this.selectedAchivementGroupIndex = index;
	}

	init(): void {
		try {
			if ($WowheadPower) {
				$WowheadPower.init();
				setTimeout( () => $WowheadPower.hideTooltip(), 5);
			}
		} catch (error) {
			console.log(error);
		}
	}
}
