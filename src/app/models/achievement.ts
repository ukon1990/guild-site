export class AchievementListItem {
	id: number;
	name: string;
	achievements: Achievement[];
	categories?: Category[];
}

export class Achievement {
	id: number;
	title: string;
	points: number;
	description: string;
	rewardItems: number[];
	icon: string;
	criteria: Criteria[];
	accountWide: boolean;
	factionId: number;
}

class Category {
	id: number;
	name: string;
	achievements: Achievement[];
}

class Criteria {
	id: number;
	description: string;
	orderIndex: number;
	max: number;
}
