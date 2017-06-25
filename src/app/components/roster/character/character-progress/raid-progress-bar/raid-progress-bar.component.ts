import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
	selector: 'app-raid-progress-bar',
	templateUrl: './raid-progress-bar.component.html',
	styleUrls: ['./raid-progress-bar.component.css']
})
export class RaidProgressBarComponent implements OnInit {
	@Input() bosses: any;
	@Input() difficulty: string;

	counts = {
		killed: 0, sumBosses: 0, percent: undefined
	};

	constructor(private sanitizer: DomSanitizer) {
	}

	ngOnInit() {
		if (this.bosses[0][this.difficulty + 'Kills'] !== undefined) {
			this.bosses.forEach(boss => {
				if (boss[this.difficulty + 'Kills'] > 0) {
					this.counts.killed += 1;
				}
				this.counts.sumBosses += 1;
			});
			this.counts.percent = this.sanitizer.bypassSecurityTrustStyle(
				Math.round(this.counts.killed / this.counts.sumBosses * 100) + '%'
			);
		} else {
			this.counts.sumBosses = -1;
		}
	}

}
