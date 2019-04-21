import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Character, Feed, Item} from '../../../models/character';
import {SubscriptionsUtil} from '../../../utils/subscriptions.util';
import {CharacterService} from '../../../services/character.service';
import {ColumnDescription} from '../../../models/column-description';
import {ItemService, WowheadTooltip} from '../../../services/item.service';
import {News} from '../../../models/guild.model';

@Component({
  selector: 'app-character-feed',
  templateUrl: './character-feed.component.html',
  styleUrls: ['./character-feed.component.scss']
})
export class CharacterFeedComponent implements OnDestroy {
  character: Character;
  subscriptions = new SubscriptionsUtil();
  columns: ColumnDescription[] = [
    {key: 'timestamp', title: 'Date', dataType: 'date'},
    {key: 'name', title: 'Name', dataType: 'character-feed-name'},
    {key: 'criteria', title: 'Criteria', dataType: 'criteria'},
    {key: 'quantity', title: 'Qty', dataType: 'number'},
    {key: 'context', title: 'Context', dataType: 'string'}
  ];

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

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private getTooltipData(): void {
    this.character.feed.forEach((feed: Feed) => {
      if (feed.itemId && !feed.name) {
        this.itemService.getTooltip({
          id: feed.itemId,
          bonusLists: feed.bonusLists
        } as Item)
          .then((tooltip: WowheadTooltip) => {
            feed.name = tooltip.name;
            feed.tooltip = tooltip;
          });
      }
    });
  }
}
