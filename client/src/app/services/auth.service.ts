import {EventEmitter, Injectable} from '@angular/core';
import {BLIZZARD} from '../../../../server/secrets';
import {HttpClient} from '@angular/common/http';
import {ObjectUtil} from '../utils/object.util';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public static authTokenEvent = new EventEmitter<any>();
  private authorizationTab;

  constructor(private http: HttpClient) {

    this.setAuthCodeSubscriptionEvent();
  }

  private setAuthCodeSubscriptionEvent() {
    window.addEventListener('storage', (event: StorageEvent) => {
      if (event.key === 'authorization_code') {
        window.removeEventListener('storage', () => {
        });
        this.accessTokenRequest();
        if (this.authorizationTab) {
          this.authorizationTab.close();
        }
      }
    }, false);
  }

  setAuthCode(code: string): void {
    localStorage.setItem('authorization_code', code);
  }

  setAccessToken(token: any): void {
    localStorage.setItem('access_token', JSON.stringify(token));
    BLIZZARD.ACCESS_TOKEN = token.access_token;
  }

  getAuthCode(): string {
    return localStorage.getItem('authorization_code');
  }

  getAccessToken(): string {
    const item = localStorage.getItem('access_token');
    if (ObjectUtil.isNullOrUndefined(item)) {
      return undefined;
    }

    const obj = JSON.parse(item);
    BLIZZARD.ACCESS_TOKEN = obj.access_token;
    return BLIZZARD.ACCESS_TOKEN;
  }

  checkToken() {
    const region = 'eu';
    return this.http.post(`https://${region}.battle.net/oauth/check_token `, {
      token: this.getAccessToken()
    }).toPromise();
  }

  authRequest() {
    const url = 'https://eu.battle.net/oauth/authorize?' +
      'response_type=code' +
      '&redirect_uri=' + location.origin +
      '&scope=wow.profile&' +
      'client_id=' + BLIZZARD.CLIENT_ID;
    console.log('url', url);
    this.authorizationTab = this.openNewTab(url);
  }

  accessTokenRequest() {
    this.http.post(
      'https://w6f8vikqy3.execute-api.eu-west-1.amazonaws.com/prod/auth',
      JSON.stringify({
        region: 'eu',
        code: this.getAuthCode(),
        redirectURI: location.origin
      }))
      .toPromise()
      .then((response: any) => {
        if (response.error) {
          localStorage.removeItem('authorization_code');
          localStorage.removeItem('access_token');
        } else {
          this.setAccessToken(response);
          AuthService.authTokenEvent.emit();
        }

      })
      .catch(error =>
        console.error(error));
  }


  openNewTab(url: string) {
    if (navigator.platform !== 'Win32' &&
      (window.navigator['standalone'] || window.matchMedia('(display-mode: standalone)').matches)) {
      const a = document.createElement('a');
      a.setAttribute('href', url);
      a.setAttribute('target', '_blank');

      const dispatch = document.createEvent('HTMLEvents');
      dispatch.initEvent('click', true, true);
      return a.dispatchEvent(dispatch);
    } else {
      return window.open(url, '_blank');
    }
  }
}
