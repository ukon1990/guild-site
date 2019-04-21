import {Character} from '../models/character';
import {Guild} from '../models/guild.model';
import {classColors} from '../models/classes';
import invert from 'invert-color';

export class Colors {
  static background: string;
  static font: string;

  static setFromGuild(guild: Guild): void {
    Colors.background = '#' + guild.emblem.backgroundColor;
    Colors.font = '#' + guild.emblem.iconColor;
  }

  static setColorFromClass(character: Character): void {
    Colors.background = classColors[character.class];
    Colors.font = invert(
      Colors.background);
    console.log({
      bg: Colors.background, text: Colors.font
    });
  }
}
