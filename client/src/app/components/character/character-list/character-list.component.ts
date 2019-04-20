import {Component, OnDestroy, OnInit} from '@angular/core';
import {CharacterService} from '../../../services/character.service';
import {SubscriptionsUtil} from '../../../utils/subscriptions.util';
import {AuthService} from '../../../services/auth.service';
import {UserService} from '../../../services/user.service';
import {UserRealm} from '../../../models/user-realm.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit, OnDestroy {
  private subscriptions = new SubscriptionsUtil();
  realms: UserRealm[] = [];
  showCharacters = false;

  constructor(private service: UserService, private authService: AuthService, private router: Router) {
    this.subscriptions.add(this.router.events, () =>
      this.showCharacters = false);
  }

  ngOnInit() {
    if (this.authService.getAuthCode()) {
      this.service.getCharacters()
        .then((realms: UserRealm[]) => {
          this.realms = realms;
          console.log(realms);
        })
        .catch(error =>
          console.error(error));
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
