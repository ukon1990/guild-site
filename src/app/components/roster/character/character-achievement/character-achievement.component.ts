import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
	selector: 'app-character-achievement',
	templateUrl: './character-achievement.component.html',
	styleUrls: ['./character-achievement.component.css']
})
export class CharacterAchievementComponent implements OnInit {
	@Input() completedAchievements: any[];
	@Input() achievementGroup: any;
	map = [];

	constructor(private sanitizer: DomSanitizer) { }

	ngOnInit() {
		this.completedAchievements.forEach( a => {
			this.map[a] = a;
		});

		this.achievementGroup.achievements.sort( (a: any, b: any) => this.map[a.id] && !this.map[b.id] ? -1 : 1 );
		if (this.achievementGroup.categories) {
			this.achievementGroup.categories.forEach(c => {
				c.achievements.sort( (a: any, b: any) => this.map[a.id] && !this.map[b.id] ? -1 : 1 );
			});
		}
	}


	getIcon(achievement) {
		return this.sanitizer.bypassSecurityTrustStyle(`url("https://render-eu.worldofwarcraft.com/icons/56/${
			achievement.icon
		}.jpg")`);
	}
}
