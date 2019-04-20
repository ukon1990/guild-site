import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Guild} from '../../../models/guild.model';
import {GuildService} from '../../../services/guild.service';
import {SubscriptionsUtil} from '../../../utils/subscriptions.util';
import {PageEvent} from '@angular/material';

declare const $WowheadPower: any;

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

  constructor(private guildService: GuildService) {
    this.guild = this.guildService.guild;
    this.subscriptions.add(
      GuildService.events,
      (guild: Guild) => {
        this.guild = guild;
        this.init();
      }
    );
  }

  ngAfterViewInit(): void {
    this.init();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  changePage(event: PageEvent) {
    this.pageEvent = event;
    setTimeout(
      () => this.init(),
      1);
  }

  bonusList(bonusList: any[]): string {
    return bonusList.join(':');
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
