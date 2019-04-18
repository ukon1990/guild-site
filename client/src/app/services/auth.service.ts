import { Injectable } from '@angular/core';
import { BLIZZARD } from '../../../../server/secrets';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  authRequest() {
    const url = 'https://eu.battle.net/oauth/authorize?' +
      'response_type=code' +
      '&redirect_uri=' + location.origin +
      '&scope=wow.profile sc2.profile&' +
      'client_id=' + BLIZZARD.CLIENT_ID;
    console.log('url', url);
    this.openNewTab(
      url
    );
  }

  accessTokenRequest(authCode: string) {
    console.log('The code', authCode);
    this.http.post(
      'https://eu.battle.net/oauth/authorize',
      JSON.stringify({
        grant_type: 'authorization_code',
        code: authCode,
        redirect_uri: location.origin,
        client_id: BLIZZARD.CLIENT_ID
      }))
      .toPromise()
      .then(response => console.log('code-response', response))
      .catch(error => console.error(error));
  }

  openNewTab(url: string): void {
    if (navigator.platform !== 'Win32' &&
      (window.navigator['standalone'] || window.matchMedia('(display-mode: standalone)').matches)) {
      const a = document.createElement('a');
      a.setAttribute('href', url);
      a.setAttribute('target', '_blank');

      const dispatch = document.createEvent('HTMLEvents');
      dispatch.initEvent('click', true, true);
      a.dispatchEvent(dispatch);
    } else {
      window.open(url, '_blank');
    }
  }
}
