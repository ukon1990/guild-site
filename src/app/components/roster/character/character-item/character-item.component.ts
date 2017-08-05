import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-character-item',
	templateUrl: './character-item.component.html',
	styleUrls: ['./character-item.component.css']
})
export class CharacterItemComponent {
	@Input() item: any;

	constructor() {
	}

	itemRel() {
		const result = [];
		if (this.item.id) {
			result.push('item=' + this.item.id);
		}
		if (this.item.appearance && this.item.appearance.itemId) {
			result.push('transmog=' + this.item.appearance.itemId);
		}
		if (this.item.relics) {
			const relics = [],
				relicBonus = [];
			// Relics
			this.item.relics.forEach( relic => {
				relics.push(relic.itemId);
				/* TODO: Soon™
				if (relic.bonusLists) {
					relic.bonusLists.forEach(b => tmpBonusList.push(b));
				}*/
				result[1] += relic.bonusLists.join(':');
			});

			// Gems
			if (this.item.tooltipParams) {
				if (this.item.tooltipParams.gem0) {
					relics.push(this.item.tooltipParams.gem0);
				}
				if (this.item.tooltipParams.gem1) {
					relics.push(this.item.tooltipParams.gem1);
				}
				if (this.item.tooltipParams.gem2) {
					relics.push(this.item.tooltipParams.gem2);
				}
			}
			result.push('gems=' + relics.join(':'));
		}
		if (this.item.bonusLists) {
			result.push('bonus=' + this.item.bonusLists.join(':'));
		}

		if (this.item.tooltipParams && this.item.tooltipParams.enchant) {
			result.push('ench=' + this.item.tooltipParams.enchant);
		}
		return result;
	}
}

