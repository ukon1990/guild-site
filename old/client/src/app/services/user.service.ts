import {EventEmitter, Injectable, OnDestroy} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Endpoints} from '../../../../server/utils/endpoints.util';
import {AuthService} from './auth.service';
import {User} from '../models/user.model';
import {UserRealm} from '../models/user-realm.model';
import {SubscriptionsUtil} from '../utils/subscriptions.util';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy {
  static events: EventEmitter<User> = new EventEmitter<User>();
  subscriptions = new SubscriptionsUtil();
  user: User = new User();

  constructor(private http: HttpClient, private authService: AuthService) {
    if (this.authService.getAccessToken()) {
      this.getProfile();
    }

    this.subscriptions.add(
      AuthService.authTokenEvent,
      () => this.getProfile()
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getCharacters(): Promise<any> {
    return this.http.get(
      new Endpoints().getPath('user/characters', 'eu'))
      .toPromise()
      .then((data: any) => this.handleCharactersResponse(data));
  }

  getProfile() {
    const region = 'eu';
    this.http.get(`https://${
      region
      }.battle.net/oauth/userinfo`)
      .toPromise()
      .then((user: User) =>
        this.user.setUserInfo(user))
      .catch(error =>
        console.error);
  }

  private handleCharactersResponse(data: any): any {
    const obj = UserRealm.group(data);
    this.user.characters = obj;
    UserService.events.emit(this.user);
    return obj;
  }
}
