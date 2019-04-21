import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
	selector: 'app-character-progress',
	templateUrl: './character-progress.component.html',
	styleUrls: ['./character-progress.component.css']
})
export class CharacterProgressComponent implements OnInit {
	@Input() raid: any;
	constructor(private sanitizer: DomSanitizer) {
	}

	ngOnInit() {
	}

	getBGImageUrl() {
		if (this.raid) {
			// background-image:url("https://blzmedia-a.akamaihd.net/wow/zones/the-emerald-nightmare-small.jpg")
			const url = 'https://render-eu.worldofwarcraft.com/zones/'
				+ this.raid.name.toLowerCase().replace(/[,]/g, '').replace(/[']/g, '').replace(/[ ]/g, '-') + '-small.jpg';
			return this.sanitizer.bypassSecurityTrustStyle(`url(${url}) !important`);
		}
		return '';
	}
}
