import {Component, OnDestroy, OnInit} from '@angular/core';
import {CharacterService} from '../../../services/character.service';
import {SubscriptionsUtil} from '../../../utils/subscriptions.util';
import {AuthService} from '../../../services/auth.service';
import {Character} from '../../../models/character';
import {DomSanitizer} from '@angular/platform-browser';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit, OnDestroy {
  private subscriptions = new SubscriptionsUtil();
  characters: Character[] = [];

  constructor(private service: CharacterService, private authService: AuthService, private userService: UserService) {
  }

  ngOnInit() {
    if (this.authService.getAuthCode()) {
      this.service.getCharacters()
        .then((characters: Character[]) => {
          this.characters = characters;
          console.log(characters);
        })
        .catch(error =>
          console.error(error));
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}