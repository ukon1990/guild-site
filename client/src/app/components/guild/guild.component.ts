import {Component, OnDestroy, OnInit} from '@angular/core';
import {GuildService} from "../../services/guild.service";
import {ActivatedRoute, Router} from "@angular/router";
import {guildRoutes} from "./guild.routes";
import {TitledRoute} from "../../models/route/titled-route.model";

@Component({
  selector: 'app-guild',
  templateUrl: './guild.component.html',
  styleUrls: ['./guild.component.scss']
})
export class GuildComponent implements OnInit, OnDestroy {
  tabs = guildRoutes.children || [];
  activeTab: TitledRoute = this.tabs[0];
  guild: any;

  constructor(
    private service: GuildService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit() {
    const {
      region,
      realm,
      slug
    } = this.route.snapshot.params;
    console.log('this.route.snapshot', this.route.snapshot);
    this.service.getGuild(region, realm, slug)
      .then(guild => {
        console.log('Guild', guild);
        this.guild = guild;
        this.service.active.next(guild);
      })
      .catch(console.error);
  }

  ngOnDestroy() {
    this.service.active.next(undefined);
  }
}
