import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Guild, News} from '../../../models/guild.model';
import {GuildService} from '../../../services/guild.service';
import {SubscriptionsUtil} from '../../../utils/subscriptions.util';
import {PageEvent} from '@angular/material';
import {ItemService, WowheadTooltip} from '../../../services/item.service';
import {Item} from '../../../models/character';

@Component({
  selector: 'app-guild-news',
  templateUrl: './guild-news.component.html',
  styleUrls: ['./guild-news.component.scss']
})
export class GuildNewsComponent implements OnDestroy, AfterViewInit {
  guild: Guild;
  subscriptions = new SubscriptionsUtil();
  page = {
    pageSize: 40,
    pageSizeOptions: [40, 80, 120]
  };
  pageEvent: PageEvent = {pageIndex: 0, pageSize: this.page.pageSize, length: 1};

  constructor(private guildService: GuildService, private itemService: ItemService) {
    this.guild = this.guildService.guild;
    this.getTooltipData();
    this.subscriptions.add(
      GuildService.events,
      (guild: Guild) => {
        this.guild = guild;
        this.getTooltipData();
      }
    );
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private getTooltipData(): void {
    this.guild.news.forEach((news: News) => {
      if (news.itemId && !news.name) {
        this.itemService.getTooltip({
          id: news.itemId,
          bonusLists: news.bonusLists
        } as Item)
          .then((tooltip: WowheadTooltip) => {
            news.name = tooltip.name;
            news.tooltip = tooltip;
          });
      }
    });
  }

  changePage(event: PageEvent) {
    this.pageEvent = event;
  }

  bonusList(bonusList: any[]): string {
    return bonusList.join(':');
  }

}
