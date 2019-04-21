import {Character} from './character';
import {UserRealmRoot} from './user-realm.model';

export class User {
  id: number;
  sub: number;
  battletag: string;
  characters: UserRealmRoot;

  setUserInfo(user: User) {
    this.id = user.id;
    this.sub = user.sub;
    this.battletag = user.battletag;
  }
}
