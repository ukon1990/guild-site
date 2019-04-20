import {Component, OnDestroy, OnInit} from '@angular/core';
import {Character} from '../../models/character';
import {SubscriptionsUtil} from '../../utils/subscriptions.util';
import {AuthService} from '../../services/auth.service';
import {CharacterService} from '../../services/character.service';
import {ActivatedRoute, Navigation, NavigationEnd, Router} from '@angular/router';
import {Colors} from '../../utils/colors.util';
import {classes} from '../../models/classes';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit, OnDestroy {
  character: Character;
  subscriptions = new SubscriptionsUtil();
  private urlParams: { region: string; realm: string; name: string };
  currentRoute: string;
  colors = Colors;
  classes = classes;

  constructor(private activatedRoute: ActivatedRoute, private router: Router,
              private service: CharacterService) {
    this.subscriptions.add(
      AuthService.authTokenEvent,
      () =>
        this.getCharacter());

    this.subscriptions.add(
      this.activatedRoute.params,
      (params) =>
        this.handleActivatedRouteEvent(params));

    this.subscriptions.add(
      this.router.events,
      (event) =>
        this.handleRouterEvent(event)
    );
  }

  ngOnInit() {
  }
  private handleActivatedRouteEvent(params: { region: string; realm: string; name: string }) {
    this.urlParams = params;
    this.getCharacter();
  }

  private handleRouterEvent(event: Navigation) {
    if (event instanceof NavigationEnd) {
      const base = new URL(`${location.origin}/${this.urlParams.region}/${this.urlParams.realm}/${this.urlParams.name}/character/`);
      this.currentRoute = event.url.replace(base.pathname, '');
    }
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private getCharacter() {
    this.service.get(this.urlParams.region, this.urlParams.realm, this.urlParams.name)
      .then((character: Character) => {
        this.character = character;
        Colors.setColorFromClass(character);
      })
      .catch(console.error);
  }
}
