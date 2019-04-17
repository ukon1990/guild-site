import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-character-log-item',
	templateUrl: './character-log-item.component.html',
	styleUrls: ['./character-log-item.component.css']
})
export class CharacterLogItemComponent implements OnInit {
	@Input() boss;

	constructor() { }

	ngOnInit() {
	}

}
