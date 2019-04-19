import {Character} from './character';

export class User {
  id: number;
  sub: number;
  battletag: string;
  characters: Character[];

  setUserInfo(user: User) {
    this.id = user.id;
    this.sub = user.sub;
    this.battletag = user.battletag;
  }
}
