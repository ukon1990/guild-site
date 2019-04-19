import {EventEmitter, Injectable} from '@angular/core';
import {BLIZZARD} from '../../../../server/secrets';
import {HttpClient} from '@angular/common/http';

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
  }

  getAuthCode(): string {
    return localStorage.getItem('authorization_code');
  }

  getAccessToken(): string {
    return 'USVxHNEuAdgxLYaFG5jZ4R699ATV8cKfRV'; // localStorage.getItem('access_token');
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
    console.log('The code', this.getAuthCode());
    this.http.post(
      'http://localhost:3000/auth',
      JSON.stringify({
        region: 'eu',
        code: this.getAuthCode(),
        redirectURI: location.origin
      }))
      .toPromise()
      .then((response: any) => {
        const resObj = JSON.parse(response);
        if (resObj.error) {
          localStorage.removeItem('authorization_code');
          localStorage.removeItem('access_token');
        } else {
          this.setAccessToken(response);
          AuthService.authTokenEvent.emit();
        }

      })
      .catch(error => console.error(error));
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
