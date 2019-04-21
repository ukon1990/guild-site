import {Character} from './character';
export class UserRealmRoot {
  list: UserRealm[];
  map: Map<string, UserRealm>;
}

export class UserRealm {
  name: string;
  characters: Character[] = [];
  characterMap: Map<string, Character> = new Map<string, Character>();

  constructor(character?: Character) {
    if (character) {
      this.name = character.realm;
      this.addCharacter(character);
    }
  }

  static group(data: any): UserRealmRoot {
    const characters: Character[] = data.characters;
    const realmMap: Map<string, UserRealm> = new Map<string, UserRealm>();
    const list: UserRealm[] = [];

    characters.forEach((character: Character) => {
      if (character.level < 10) {
        return;
      }

      if (!realmMap[character.realm]) {
        const userRealm = new UserRealm(character);
        realmMap[character.realm] = userRealm;
        list.push(userRealm);
      } else {
        (realmMap[character.realm] as UserRealm).addCharacter(character);
      }
    });
    console.log(realmMap);

    list
      .sort((a: UserRealm, b: UserRealm) => {
        this.sortCharacters(a);
        return b.characters.length - a.characters.length;
      });
    return {
      map: realmMap,
      list
    };
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

  private addCharacter(character: Character) {
    this.characters.push(character);
    this.characterMap.set(character.name, character);
  }
}
