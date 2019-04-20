import {Component, OnDestroy} from '@angular/core';
import {Guild} from '../../../models/guild.model';
import {SubscriptionsUtil} from '../../../utils/subscriptions.util';
import {GuildService} from '../../../services/guild.service';

@Component({
  selector: 'app-guild-roster',
  templateUrl: './guild-roster.component.html',
  styleUrls: ['./guild-roster.component.scss']
})
export class GuildRosterComponent implements OnDestroy {
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
