export class Challenge {
	bronzeCount: number;
	completedCount: 0;
	goldCount: 0;
	records: Array<ChallengeRecord>;
}

export class ChallengeRecord {
	bestMedal: string;
	bestMedalDate: Date;
	goal: number;
	guildRank: number;
	realmRank: number;
	regionRank: number;
	map: ChallengeMap;
	bestTime: ChallengeTime;
	diff: ChallengeTime;
	lastTime: ChallengeTime;
}

export class ChallengeMap {
	id: number;
	name: string;
	slug: string;
	hasChallengeMode: number;
	goldCriteria: ChallengeTime;
	silverCriteria: ChallengeTime;
	bronzeCriteria: ChallengeTime;
}

export class ChallengeTime {
	time: number;
	hours: number;
	minutes: number;
	seconds: number;
	milliseconds: number;
	isPositive: boolean;
}
