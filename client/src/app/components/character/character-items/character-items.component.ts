import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Character} from '../../../models/character';
import {SubscriptionsUtil} from '../../../utils/subscriptions.util';
import {GuildService} from '../../../services/guild.service';
import {Guild} from '../../../models/guild.model';
import {CharacterService} from '../../../services/character.service';

declare const $WowheadPower: any;
@Component({
  selector: 'app-character-items',
  templateUrl: './character-items.component.html',
  styleUrls: ['./character-items.component.scss']
})
export class CharacterItemsComponent implements AfterViewInit, OnDestroy {
  character: Character;
  subscriptions = new SubscriptionsUtil();

  constructor(private service: CharacterService) {
    this.character = this.service.character;
    this.subscriptions.add(
      CharacterService.events,
      (character: Character) => {
        this.character = character;
        this.init();
      }
    );
  }

  ngAfterViewInit() {
    this.init();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  init(): void {
    try {
      if ($WowheadPower) {
        $WowheadPower.init();
      }
    } catch (error) {
      console.log(error);
    }
  }
}
