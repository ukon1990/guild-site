import {Component, OnDestroy, OnInit} from '@angular/core';
import {CharacterService} from '../../../services/character.service';
import {SubscriptionsUtil} from '../../../utils/subscriptions.util';
import {AuthService} from '../../../services/auth.service';
import {Character} from '../../../models/character';
import {UserService} from '../../../services/user.service';
import {UserRealm} from '../../../models/user-realm.model';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit, OnDestroy {
  private subscriptions = new SubscriptionsUtil();
  realms: UserRealm[] = [];

  constructor(private service: UserService, private authService: AuthService, private userService: UserService) {
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
