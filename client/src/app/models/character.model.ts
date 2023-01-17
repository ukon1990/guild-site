import {Realm} from "./realm.model";
import {PlayableClass} from "./playable-class.model";
import {PlayableRace} from "./playable-race.model";

export interface Character {
  name: string;
  id: number;
  realm: Realm;
  level: number;
  playable_class: PlayableClass;
  playable_race: PlayableRace;
}
