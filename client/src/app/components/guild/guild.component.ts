import {Component, OnInit} from '@angular/core';
import {GuildService} from "../../services/guild.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-guild',
  templateUrl: './guild.component.html',
  styleUrls: ['./guild.component.scss']
})
export class GuildComponent implements OnInit {
  constructor(
    private service: GuildService,
    private route: ActivatedRoute,
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
      .then(console.log)
      .catch(console.error);
  }
}
