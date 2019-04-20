export interface Achievements {
  achievementsCompleted: number[];
  achievementsCompletedTimestamp: any[];
  criteria: number[];
  criteriaQuantity: any[];
  criteriaTimestamp: any[];
  criteriaCreated: any[];
}

export interface Spec {
  name: string;
  role: string;
  backgroundImage: string;
  icon: string;
  description: string;
  order: number;
}

export interface GuildCharacter {
  name: string;
  realm: string;
  battlegroup: string;
  class: number;
  race: number;
  gender: number;
  level: number;
  achievementPoints: number;
  thumbnail: string;
  spec: Spec;
  guild: string;
  guildRealm: string;
  lastModified: number;
}

export interface Member {
  character: GuildCharacter;
  rank: number;
}

export interface Emblem {
  icon: number;
  iconColor: string;
  iconColorId: number;
  border: number;
  borderColor: string;
  borderColorId: number;
  backgroundColor: string;
  backgroundColorId: number;
}

export interface Criterion {
  id: number;
  description: string;
  orderIndex: number;
  max: number;
}

export interface Achievement {
  id: number;
  title: string;
  points: number;
  description: string;
  rewardItems: any[];
  icon: string;
  criteria: Criterion[];
  accountWide: boolean;
  factionId: number;
  reward: string;
}

export interface News {
  type: string;
  character: string;
  timestamp: any;
  itemId: number;
  context: string;
  bonusLists: number[];
  achievement: Achievement;
}

export interface Realm {
  name: string;
  slug: string;
  battlegroup: string;
  locale: string;
  timezone: string;
  connected_realms: string[];
}

export interface BronzeCriteria {
  time: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
  isPositive: boolean;
}

export interface SilverCriteria {
  time: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
  isPositive: boolean;
}

export interface GoldCriteria {
  time: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
  isPositive: boolean;
}

export interface Map {
  id: number;
  name: string;
  slug: string;
  hasChallengeMode: boolean;
  bronzeCriteria: BronzeCriteria;
  silverCriteria: SilverCriteria;
  goldCriteria: GoldCriteria;
}

export interface Time {
  time: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
  isPositive: boolean;
}

export interface Spec2 {
  name: string;
  role: string;
  backgroundImage: string;
  icon: string;
  description: string;
  order: number;
}

export interface GuildCharacter2 {
  name: string;
  realm: string;
  battlegroup: string;
  class: number;
  race: number;
  gender: number;
  level: number;
  achievementPoints: number;
  thumbnail: string;
  spec: Spec2;
  guild: string;
  guildRealm: string;
  lastModified: number;
}

export interface Spec3 {
  name: string;
  role: string;
  backgroundImage: string;
  icon: string;
  description: string;
  order: number;
}

export interface Member2 {
  character: GuildCharacter2;
  spec: Spec3;
}

export interface Emblem2 {
  icon: number;
  iconColor: string;
  iconColorId: number;
  border: number;
  borderColor: string;
  borderColorId: number;
  backgroundColor: string;
  backgroundColorId: number;
}

export interface CharacterGuild {
  name: string;
  realm: string;
  battlegroup: string;
  members: number;
  achievementPoints: number;
  emblem: Emblem2;
}

export interface Group {
  ranking: number;
  time: Time;
  date: Date;
  faction: string;
  isRecurring: boolean;
  members: Member2[];
  guild: CharacterGuild;
}

export interface Challenge {
  realm: Realm;
  map: Map;
  groups: Group[];
}

export interface Guild {
  lastModified: number;
  name: string;
  realm: string;
  battlegroup: string;
  level: number;
  side: number;
  achievementPoints: number;
  achievements: Achievements;
  members: Member[];
  emblem: Emblem;
  news: News[];
  challenge: Challenge[];
}

