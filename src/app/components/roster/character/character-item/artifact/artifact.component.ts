import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-artifact',
	templateUrl: './artifact.component.html',
	styleUrls: ['./artifact.component.css']
})
export class ArtifactComponent implements OnInit {
	@Input() artifact: any;
	traitCount = 0;
	constructor() { }

	ngOnInit() {
		this.artifact.artifactTraits.forEach(t => {
			this.traitCount += t.rank;
		});
	}
}
