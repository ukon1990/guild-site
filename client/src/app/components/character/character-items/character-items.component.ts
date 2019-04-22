import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Character, Feed, Item} from '../../../models/character';
import {SubscriptionsUtil} from '../../../utils/subscriptions.util';
import {GuildService} from '../../../services/guild.service';
import {Guild} from '../../../models/guild.model';
import {CharacterService} from '../../../services/character.service';
import {ItemService, WowheadTooltip} from '../../../services/item.service';

declare const $WowheadPower: any;

@Component({
  selector: 'app-character-items',
  templateUrl: './character-items.component.html',
  styleUrls: ['./character-items.component.scss']
})
export class CharacterItemsComponent implements AfterViewInit, OnDestroy {
  character: Character;
  subscriptions = new SubscriptionsUtil();

  constructor(private service: CharacterService, private itemService: ItemService) {
    this.character = this.service.character;
    this.getTooltipData();
    this.subscriptions.add(
      CharacterService.events,
      (character: Character) => {
        this.character = character;
        this.getTooltipData();
      }
    );
  }

  ngAfterViewInit() {
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private getTooltipData(): void {
    Object.keys(this.character.items).forEach((slot: string) => {
      const item: Item = this.character.items[slot];
      if (!item.tooltip && item.id) {
        this.itemService.getTooltip(item)
          .then((tip) => console.log(tip));
      }

    });
  }
}
