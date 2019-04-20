import {Character} from './character';

export class UserRealm {
  name: string;
  characters: Character[] = [];

  constructor(character?: Character) {
    if (character) {
      this.name = character.realm;
      this.characters.push(character);
    }
  }

  static group(data: any) {
    const characters: Character[] = data.characters;
    const realmMap = {};
    const list: UserRealm[] = [];

    characters.forEach((character: Character) => {
      if (character.level < 10) {
        return;
      }

      if (!realmMap[character.realm]) {
        realmMap[character.realm] = new UserRealm(character);
        list.push(realmMap[character.realm]);
      } else {
        realmMap[character.realm].characters.push(character);
      }
    });
    console.log(realmMap);

    return list
      .sort((a: UserRealm, b: UserRealm) => {
        this.sortCharacters(a);
        return b.characters.length - a.characters.length;
      });
  }

  private static sortCharacters(userRealm: UserRealm) {
    userRealm.characters
      .sort(
        (a: Character, b: Character) => {
          const levelDiff = b.level - a.level;
          if (levelDiff !== 0) {
            return levelDiff;
          }
          return b.achievementPoints - a.achievementPoints;
        });
  }
}
