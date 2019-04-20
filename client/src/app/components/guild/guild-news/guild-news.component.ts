import {Component, OnDestroy, OnInit} from '@angular/core';
import {Guild} from '../../../models/guild.model';
import {GuildService} from '../../../services/guild.service';
import {SubscriptionsUtil} from '../../../utils/subscriptions.util';

@Component({
  selector: 'app-guild-news',
  templateUrl: './guild-news.component.html',
  styleUrls: ['./guild-news.component.scss']
})
export class GuildNewsComponent implements OnDestroy {
  guild: Guild;
  subscriptions = new SubscriptionsUtil();

  constructor(private guildService: GuildService) {
    this.guild = this.guildService.guild;
    this.subscriptions.add(
      GuildService.events,
      (guild: Guild) =>
        this.guild = guild
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
