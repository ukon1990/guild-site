import {Media} from "./media.model";
import {Background, Color} from "./color.model";
import {Character} from "./character.model";
import {Achievement, AchievementDescription, Achievements} from "./achievement.model";
import {Locale} from "./locale.model";
import {Realm} from "./realm.model";
import {EncounterCompleted} from "./encounter.model";
import {Faction} from "./faction.model";


export interface Emblem {
    id: number;
    media: Media;
    color: Color;
  }

  export interface Border {
    id: number;
    media: Media;
    color: Color;
  }

  export interface Crest {
    emblem: Emblem;
    border: Border;
    background: Background;
  }


  export interface Member {
    character: Character;
    rank: number;
  }

  export interface Roster {
    members: Member[];
  }

  export interface RecentEvent {
    achievement: AchievementDescription;
    timestamp: any;
  }

  export interface Character2 {
    name: string;
    id: number;
    realm: Realm;
  }
  export interface Achievement4 {
    name: Locale;
    id: number;
  }

  export interface CharacterAchievement {
    character: Character2;
    achievement: Achievement4;
  }

  export interface Activity {
    encounter_completed: EncounterCompleted;
    activity: {
      type: string;
    };
    timestamp: any;
    character_achievement: CharacterAchievement;
  }

  export interface Guild {
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
