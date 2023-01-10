import {Component, Input, OnInit} from '@angular/core';
import {Character} from '../../../models/character';
import {DomSanitizer} from '@angular/platform-browser';
import {GuildCharacter} from '../../../models/guild.model';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss']
})
export class CharacterCardComponent implements OnInit {
  @Input() character: Character | GuildCharacter;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  getThumbnail(character: Character) {
    if (character.thumbnail && character.thumbnail !== 'unknown/unknown-avatar.jpg') {
      return this.sanitizer.bypassSecurityTrustStyle(
        `url(http://render-eu.worldofwarcraft.com/character/${character.thumbnail})`);
    }
    return '';
  }

  getBGImageUrl(spec: string) {
    if (spec) {
      const url = 'assets/images/specs/' + spec + '.png';
      return this.sanitizer.bypassSecurityTrustStyle('url(' + url + ')');
    }
    return '';
  }
}
