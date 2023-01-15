import {Links} from "@libs/models/links.model";

export namespace Guild {
  export interface Faction {
    type: string;
    name: string;
  }

  export interface Key {
    href: string;
  }

  export interface Realm {
    key: Key;
    name: string;
    id: number;
    slug: string;
  }

  export interface Media {
    key: Key;
    id: number;
  }

  export interface Rgba {
    r: number;
    g: number;
    b: number;
    a: number;
  }

  export interface Color {
    id: number;
    rgba: Rgba;
  }

  export interface Emblem {
    id: number;
    media: Media;
    color: Color;
  }

  export interface Media2 {
    key: Key;
    id: number;
  }

  export interface Rgba2 {
    r: number;
    g: number;
    b: number;
    a: number;
  }

  export interface Color2 {
    id: number;
    rgba: Rgba2;
  }

  export interface Border {
    id: number;
    media: Media2;
    color: Color2;
  }

  export interface Rgba3 {
    r: number;
    g: number;
    b: number;
    a: number;
  }

  export interface Color3 {
    id: number;
    rgba: Rgba3;
  }

  export interface Background {
    color: Color3;
  }

  export interface Crest {
    emblem: Emblem;
    border: Border;
    background: Background;
  }
  export interface PlayableClass {
    key: Key;
    id: number;
  }

  export interface PlayableRace {
    key: Key;
    id: number;
  }

  export interface Character {
    key: Key;
    name: string;
    id: number;
    realm: Realm;
    level?: number;
    playable_class?: PlayableClass;
    playable_race?: PlayableRace;
  }

  export interface Member {
    character: Character;
    rank: number;
  }

  export interface Roster {
    members: Member[];
  }
  export interface AchievementDetails {
    key: Key;
    name: string;
    id: number;
  }

  export interface ChildCriteria {
    id: number;
    amount: number;
    is_completed: boolean;
  }

  export interface Criteria {
    id: number;
    is_completed: boolean;
    child_criteria: ChildCriteria[];
    amount?: number;
  }

  export interface Achievement {
    id: number;
    achievement: AchievementDetails;
    criteria: Criteria;
    completed_timestamp: any;
  }

  export interface Category {
    key: Key;
    name: string;
    id: number;
  }

  export interface CategoryProgress {
    category: Category;
    quantity: number;
    points: number;
  }

  export interface RecentEvent {
    achievement: AchievementDetails;
    timestamp: number;
  }

  export interface Achievements {
    total_quantity: number;
    total_points: number;
    achievements: Achievement[];
    category_progress: CategoryProgress[];
    recent_events: RecentEvent[];
  }
  export interface CharacterAchievement {
    character: Character;
    achievement: AchievementDetails;
  }


  export interface Encounter {
    key: Key;
    name: string;
    id: number;
  }

  export interface Mode {
    type: string;
    name: string;
  }

  export interface EncounterCompleted {
    encounter: Encounter;
    mode: Mode;
  }

  export interface Activity {
    character_achievement: CharacterAchievement;
    activity: {
      type: string;
    };
    timestamp: any;
    encounter_completed: EncounterCompleted;
  }

  export interface Guild {
    _links: Links;
    id: number;
    name: string;
    faction: Faction;
    achievement_points: number;
    member_count: number;
    realm: Realm;
    crest: Crest;
    roster: Roster;
    achievements: Achievements;
    created_timestamp: number;
    activities: Activity[];
  }
}
