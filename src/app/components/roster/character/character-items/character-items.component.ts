import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-character-items',
	templateUrl: './character-items.component.html',
	styleUrls: ['./character-items.component.css']
})
export class CharacterItemsComponent implements OnInit {
	@Input() items: any;
	constructor() { }

	ngOnInit() {
	}

}
