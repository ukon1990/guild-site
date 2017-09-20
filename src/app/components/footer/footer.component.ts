import { Component, OnInit } from '@angular/core';

declare function require(moduleName: string): any;
const version = require('../../../../package.json').version;
@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

	getVersion(): string {
		return version;
	}
}
