import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {GuildService} from "../../../services/guild.service";
import {Subscription} from "rxjs";
import {Roster} from "../../../models/guild.model";

@Component({
  selector: 'app-guild-roster',
  templateUrl: './guild-roster.component.html',
  styleUrls: ['./guild-roster.component.scss']
})
export class GuildRosterComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  roster?: Roster;

  constructor(
    private route: ActivatedRoute,
    private service: GuildService
  ) {
  }

  ngOnInit() {
    console.log('Roster', this.route.snapshot, history.state);
    this.subscriptions.add(
      this.service.active.subscribe(active => {
        this.roster = active?.roster;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
