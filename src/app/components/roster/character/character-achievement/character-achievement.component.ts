import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
	selector: 'app-character-achievement',
	templateUrl: './character-achievement.component.html',
	styleUrls: ['./character-achievement.component.css']
})
export class CharacterAchievementComponent implements OnInit {
	@Input() completedAchievements: any[];
	@Input() completedAchievementsTimestamp: any[];
	@Input() achievementGroup: any;
	@Output() resetIndex = new EventEmitter();
	map = [];

	constructor(private sanitizer: DomSanitizer) { }

	ngOnInit() {
		for (let i = 0, x = this.completedAchievements.length; i < x; i++) {
			this.map[this.completedAchievements[i]] = this.completedAchievementsTimestamp[i];
		}

		this.achievementGroup.achievements.sort( (a: any, b: any) => this.map[a.id] < !this.map[b.id] ? 1 : -1 );
		if (this.achievementGroup.categories) {
			this.achievementGroup.categories.forEach(c => {
				c.achievements.sort( (a: any, b: any) => this.map[a.id] < !this.map[b.id] ? 1 : -1);
			});
		}
	}


	getIcon(achievement) {
		return this.sanitizer.bypassSecurityTrustStyle(`url("https://render-eu.worldofwarcraft.com/icons/56/${
			achievement.icon
		}.jpg")`);
	}
}
