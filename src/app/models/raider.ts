import { Log } from './log';
import { Character } from './character';
import { classes } from './classes';

export class Raider {
  name: string;
  realm: string;
  classIndex: number;
  class: string;
  spec: string;
  specs: Array<any> = new Array<any>();
  lastModified: number;
  role: string;
  itemLevel: number = 0;
  logs: Array<Log> = new Array<Log>();

  // Logs
  best_historical_percent: number;
  best_persecondamount: number;
  best_allstar_points: number;

  constructor(character: Character) {
    this.name = character.name;
    this.realm = character.realm;
    this.class = classes[character.class];
    this.classIndex = character.class;
    this.setSpec(character);
    this.setRole(character);
    this.lastModified = character.lastModified;
  }

  public setSpec(character: Character): void {
    this.spec = character && character.spec ?
      character.spec.name : '';
  }

  public setRole(character: Character): void {
    this.role = character && character.spec ?
      character.spec.role : '';
  }

  public static setLogData(raider: Raider, logs: Array<Log>): void {
    // TODO
  }
}
