import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
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

	bonusList(bonusList: any[]): string {
		return bonusList.join(':');
	}
}
