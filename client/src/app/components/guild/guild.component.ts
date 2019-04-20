import {Component, OnDestroy, OnInit} from '@angular/core';
import {SubscriptionsUtil} from '../../utils/subscriptions.util';
import {ActivatedRoute, Navigation, NavigationEnd, Router} from '@angular/router';
import {GuildService} from '../../services/guild.service';
import {Guild} from '../../models/guild.model';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-guild',
  templateUrl: './guild.component.html',
  styleUrls: ['./guild.component.scss']
})
export class GuildComponent implements OnInit, OnDestroy {
  subscriptions = new SubscriptionsUtil();
  guild: Guild;
  urlParams;
  currentRoute;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private service: GuildService) {
    this.subscriptions.add(
      AuthService.authTokenEvent,
      () => {
        this.getGuild(this.urlParams);
      }
    );
    this.subscriptions.add(
      this.activatedRoute.params,
      (params) =>
        this.handleActivatedRouteEvent(params));

    this.subscriptions.add(
      this.router.events,
      (event) => this.handleRouterEvent(event)
    );
  }

  ngOnInit(): void {
    console.log('route', this.activatedRoute);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private handleActivatedRouteEvent(params: { region: string; realm: string; name: string }) {
    this.urlParams = params;
    this.getGuild(params);
  }

  private getGuild(params: { region: string; realm: string; name: string }) {
    this.service.get(params.region, params.realm, params.name)
      .then(
        (guild: Guild) => {
          this.guild = guild;
          console.log(guild);
        })
      .catch(console.error);
  }

  private handleRouterEvent(event: Navigation) {
    if (event instanceof NavigationEnd) {
      const base = new URL(`${location.origin}/${this.urlParams.region}/${this.urlParams.realm}/${this.urlParams.name}/guild/`);
      this.currentRoute = event.url.replace(base.pathname, '');
    }
  }
}
