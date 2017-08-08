import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { AchievementListItem } from '../../../../models/achievement';

@Component({
	selector: 'app-character-achievement-list-item',
	templateUrl: './character-achievement-list-item.component.html',
	styleUrls: ['./character-achievement-list-item.component.css']
})
export class CharacterAchievementListItemComponent implements OnInit, OnChanges {
	@Input() achievementGroup: AchievementListItem;
	@Input() completedAchievements: any;
	map = [];
	constructor() { }

	ngOnInit() {
		this.processAchievements();
	}

	ngOnChanges(): void {
		this.processAchievements();
	}

	processAchievements(): void {
		if (this.completedAchievements && this.completedAchievements !== null) {
			this.completedAchievements.forEach( a => {
				this.map[a] = a;
			});
			this.achievementGroup.categoryAchievementCount = 0;
			if (this.achievementGroup.categories && this.achievementGroup.categories !== null) {
				this.achievementGroup.categories.forEach( c => {
					this.achievementGroup.categoryAchievementCount += c.achievements.length;
				});
			}
			this.achievementGroup
				.progress = Math
					.round((this.getCompletedCount() /
					(this.achievementGroup.achievements.length + this.achievementGroup.categoryAchievementCount) * 100));
		}
	}
	getCompletedCount(): number {
		let completed = 0;
		this.achievementGroup.achievements.forEach(a => {
			if (this.map[a.id + '']) {
				completed++;
			}
		});

		if (this.achievementGroup.categories) {
			this.achievementGroup.categories.forEach(c => {
				c.achievements.forEach(a => {
					if (this.map[a.id + '']) {
						completed++;
					}
				});
			});
		}
		return completed;
	}
}
