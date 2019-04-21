import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Character} from '../../../models/character';
import {SubscriptionsUtil} from '../../../utils/subscriptions.util';
import {CharacterService} from '../../../services/character.service';
import {ColumnDescription} from '../../../models/column-description';

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

  constructor(private service: CharacterService) {
    this.character = this.service.character;
    this.subscriptions.add(
      CharacterService.events,
      (character: Character) => {
        this.character = character;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
