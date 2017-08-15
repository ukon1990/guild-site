import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { PageEvent } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
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
	characterSpecialization = '';


	page = {
		pageSize: 6,
		pageSizeOptions: [6, 12],
		selectedTabIndex: 0
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
	classes = [
		'0', 'Warrior', 'Paladin', 'Hunter', 'Rogue',
		'Priest', 'Death knight', 'Shaman', 'Mage',
		'Warlock', 'Monk', 'Druid', 'Demon hunter'];

	constructor(private activatedRoute: ActivatedRoute, private router: Router, achievementsService: AchievementsService,
		private sanitizer: DomSanitizer, private characterService: CharacterService) {

		this.achievementsService = achievementsService;

		this.sub = this.activatedRoute.params.subscribe(p => {
			this.character.realm = p['realm'];
			this.character.name = p['character'];
			this.setTabIndexFromRoute(p);
			this.characterService.getCharacter(p['realm'], p['character'])
				.then(c => {
					this.character = c.json();
					console.log(this.character);
					this.character.progression.raids.reverse();
					this.character.talents.forEach(spec => {
						if (spec.selected) {
							this.characterSpecialization = spec.spec.name;
						}
					});
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

	// WTS better practice xD
	onTabChanged(event): void {
		const baseUrl = `roster/${this.character.realm}/${this.character.name}/`;
		switch (event.index) {
			case 1:
				this.router.navigateByUrl(baseUrl + 'progress');
				break;
			case 2:
				this.router.navigateByUrl(baseUrl + 'logs');
				break;
			case 3:
				this.router.navigateByUrl(baseUrl + 'achievements');
				break;
			case 4:
				this.router.navigateByUrl(baseUrl + 'pvp');
				break;
			case 5:
				this.router.navigateByUrl(baseUrl + 'statistics');
				break;
			default:
				this.router.navigateByUrl(baseUrl + '');
				break;
		}
		this.init();
	}

	setTabIndexFromRoute(path): void {
		console.log('routeIndexSet', path);
		if (path.tab) {
			switch (path.tab.toLowerCase()) {
				case 'progress':
					this.page.selectedTabIndex = 1;
					break;
				case 'logs':
					this.page.selectedTabIndex = 2;
					break;
				case 'achievements':
					this.page.selectedTabIndex = 3;
					/* TODO: Soon™
					if (path.category) {
						this.selectedAchivementGroupIndex =
							this.findSelectedAchievementGroupIndex(path.category);
					}*/
					break;
				case 'pvp':
					this.page.selectedTabIndex = 4;
					break;
				case 'statistics':
					this.page.selectedTabIndex = 5;
					break;
				default:
					this.page.selectedTabIndex = 0;
					break;
			}
		}
	}

	unselectAchievementGroup(event): void {
		this.selectedAchivementGroupIndex = -1;
	}

	selectAchievementGroup(index: number, name: string) {
		this.selectedAchivementGroupIndex = index;
		/* Soon ™
		this.router.navigateByUrl(`roster/${
			this.character.realm}/${
				this.character.name}/achievements/${
					name}`);*/
	}

	findSelectedAchievementGroupIndex(group: string): number {
		for (let i = 0, x = this.achievementsService.achievements.length; i < x; i++) {
			if (this.achievementsService.achievements[i].name.toLowerCase() === group.toLowerCase()) {
				return i;
			}
		}
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
