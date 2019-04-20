import {Character} from '../models/character';
import {Guild} from '../models/guild.model';
import {classColors} from '../models/classes';

export class Colors {
  static background: string;
  static font: string;

  static setFromGuild(guild: Guild): void {
    Colors.background = '#' + guild.emblem.backgroundColor;
    Colors.font = '#' + guild.emblem.iconColor;
  }

  static setColorFromClass(character: Character): void {
    Colors.background = classColors[character.class];
    Colors.font = Colors.invertHex(
      Colors.background);
    console.log({
      bg: Colors.background, text: Colors.font
    });
  }

  private static invertHex(color: string): string {
    if (color.length !== 6) {
      return undefined;
    }

    color = color.toUpperCase();
    const splitnum = color.split('');
    let resultnum = '';
    const simplenum = 'FEDCBA9876'.split('');
    const complexnum = {
      A: '5',
      B: '4',
      C: '3',
      D: '2',
      E: '1',
      F: '0'
    };

    for (let i = 0; i < 6; i++) {
      if (!isNaN(+splitnum[i])) {
        resultnum += simplenum[splitnum[i]];
      } else if (complexnum[splitnum[i]]) {
        resultnum += complexnum[splitnum[i]];
      } else {
        return undefined;
      }
    }

    return resultnum;
  }
}
