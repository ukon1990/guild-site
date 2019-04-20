import {Component, OnDestroy, OnInit} from '@angular/core';
import {SubscriptionsUtil} from '../../utils/subscriptions.util';
import {ActivatedRoute, Navigation, NavigationEnd, Router} from '@angular/router';
import {GuildService} from '../../services/guild.service';
import {Guild, GuildCharacter, Member} from '../../models/guild.model';
import {AuthService} from '../../services/auth.service';
import {UserService} from '../../services/user.service';
import {Character} from '../../models/character';
import {UserRealm} from '../../models/user-realm.model';

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
  userHighestRank = -1;

  constructor(private activatedRoute: ActivatedRoute, private router: Router,
              private service: GuildService, private userService: UserService) {
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

    this.subscriptions.add(
      UserService.events,
      () => this.setHighestGuildRank()
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
          this.setHighestGuildRank();
          console.log(guild);
        })
      .catch(console.error);
  }

  private setHighestGuildRank() {
    if (!this.userService.user || !this.userService.user.characters) {
      return;
    }
    this.userHighestRank = -1;
    const userRealm: UserRealm = this.userService.user.characters.map[this.urlParams.realm];
    this.guild.members
      .forEach((member: Member) => {
        if (userRealm && userRealm.characterMap.get(member.character.name)) {
          if (this.userHighestRank === -1 || member.rank < this.userHighestRank) {
            this.userHighestRank = member.rank;
          }
        }
      });
  }

  private handleRouterEvent(event: Navigation) {
    if (event instanceof NavigationEnd) {
      const base = new URL(`${location.origin}/${this.urlParams.region}/${this.urlParams.realm}/${this.urlParams.name}/guild/`);
      this.currentRoute = event.url.replace(base.pathname, '');
    }
  }
}
