import { Component, OnInit } from '@angular/core';
import {Guild} from '../../../models/guild.model';
import {GuildService} from '../../../services/guild.service';

@Component({
  selector: 'app-guild-news',
  templateUrl: './guild-news.component.html',
  styleUrls: ['./guild-news.component.scss']
})
export class GuildNewsComponent {
  guild: Guild;

  constructor(private guildService: GuildService) {
    this.guild = this.guildService.guild;
  }

}
