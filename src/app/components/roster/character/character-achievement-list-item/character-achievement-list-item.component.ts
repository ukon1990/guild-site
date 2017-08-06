import { Component, Input, OnInit } from '@angular/core';
import { AchievementListItem } from '../../../../models/achievement';

@Component({
	selector: 'app-character-achievement-list-item',
	templateUrl: './character-achievement-list-item.component.html',
	styleUrls: ['./character-achievement-list-item.component.css']
})
export class CharacterAchievementListItemComponent implements OnInit {
	@Input() achievementCategory: AchievementListItem;
	@Input() completedAchievements: any;
	map = [];
	constructor() { }

	ngOnInit() {
		console.log('achievementCategory', this.achievementCategory);
		console.log('completedAchievements', this.completedAchievements);
		this.completedAchievements.forEach( a => {
			this.map[a] = a;
		});
		this.achievementCategory
			.progress = Math
				.round((this.getCompletedCount() / this.achievementCategory.achievements.length * 100));
	}

	getCompletedCount(): number {
		let completed = 0;
		this.achievementCategory.achievements.forEach(a => {
			if (this.map[a.id + '']) {
				completed++;
			}
		});
		return completed;
	}
}
