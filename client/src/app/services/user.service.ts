import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Endpoints} from '../../../../server/utils/endpoints.util';
import {AuthService} from './auth.service';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User = new User();

  constructor(private http: HttpClient, private authService: AuthService) {
    if (this.authService.getAccessToken()) {
      this.getProfiles();
    }
  }

  getCharacters() {
    this.http.get(new Endpoints().getPath('user/characters', 'eu'));
  }

  getProfiles() {
    const region = 'eu';
    this.http.get(`https://${
      region
      }.battle.net/oauth/userinfo?access_token=${
      this.authService.getAccessToken()
      }`)
      .toPromise()
      .then((user: User) =>
        this.user.setUserInfo(user))
      .catch(error =>
        console.error);
  }
}
