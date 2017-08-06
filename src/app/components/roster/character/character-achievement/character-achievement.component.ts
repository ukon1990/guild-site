import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-character-achievement',
	templateUrl: './character-achievement.component.html',
	styleUrls: ['./character-achievement.component.css']
})
export class CharacterAchievementComponent implements OnInit {
	@Input() completedAchievements: any[];
	@Input() achievementGroup: any;
	constructor() { }

	ngOnInit() {
	}

}
