import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { PageEvent } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { CharacterService } from '../../../services/character.service';

declare const $WowheadPower: any;
@Component({
	selector: 'app-character',
	templateUrl: './character.component.html',
	styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit, OnDestroy {
	private sub: any;
	character: any = {name: '', realm: ''};
	logs: any[];
	page = {
		pageSize: 6,
		pageSizeOptions: [6, 12]
	};
	// pages: any = {raid: {count: 0, current: 1, perPage: 3}};
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

	constructor(private activatedRoute: ActivatedRoute,
		private sanitizer: DomSanitizer, private characterService: CharacterService) { }

	ngOnInit() {
		this.sub = this.activatedRoute.params.subscribe(p => {
			this.character.realm = p['realm'];
			this.character.name = p['character'];
			this.characterService.getCharacter(p['realm'], p['character'])
				.then(c => {
					this.character = c.json();
					console.log(this.character);
					this.character.progression.raids.reverse();
					$WowheadPower.init();
				})
				.catch(error => console.log(error));
			this.characterService.getCharacterLogs(this.slugifyName(p['realm']), p['character'], 'hps')
				.then(logs => {
					this.logs = logs;
					console.log(logs);
				})
				.catch(error => console.log(error));
		});
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
		return this.sanitizer.bypassSecurityTrustStyle(this.classBgColor[this.character.class]);
	}

	bonusList(bonusList: any[]): string {
		return bonusList.join(':');
	}

	slugifyName(name: string): string {
		return name.replace(/[\' ]/i, '-');
	}
}
