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
		if (this.item.bonusLists) {
			result.push('bonus=' + this.item.bonusLists.join(':'));
		}
		if (this.item.appearance && this.item.appearance.itemId) {
			result.push('transmog=' + this.item.appearance.itemId);
		}
		if (this.item.relics) {
			const relics = [];
			this.item.relics.forEach( relic => {
				relics.push(relic.itemId);
				result[1] += relic.bonusLists.join(':');
			});
			result.push('gems=' + relics.join(':'));
		}
		return result;
	}
}

