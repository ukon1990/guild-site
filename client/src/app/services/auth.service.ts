import {AuthConfig, JwksValidationHandler, OAuthService} from 'angular-oauth2-oidc-codeflow';
import {Injectable} from '@angular/core';
import {BLIZZARD} from '../../../../server/secrets';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private oauthService: OAuthService) {
    // this.configureWithNewConfigApi();
    // this.oauthService.initAuthorizationCodeFlow();
  }

  private configureWithNewConfigApi() {
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();

    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(response => {
      console.log('Success?', response);
    }).catch(err => {
      console.log('Login failed');
    });


    // Call this.oauthService.tryLogin() if discovery document is not used.
    // All configurations must be set manually.
  }

  setAuthCode(code: string): void {
    localStorage.setItem('authorization_code', code);
    this.accessTokenTest();
  }

  setAccessToken(token: string): void {
    localStorage.setItem('access_token', token);
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
      '&scope=wow.profile sc2.profile&' +
      'client_id=' + BLIZZARD.CLIENT_ID;
    console.log('url', url);
    this.openNewTab(
      url
    );
  }

  accessTokenTest(): void {
    this.http.get(`https://eu.battle.net/oauth/token?grant_type=authorization_code&client_id=${
      BLIZZARD.CLIENT_ID
      }&code=${
      this.getAuthCode()
      }&redirect_uri=${
      location.origin
      }`)
      .toPromise();
  }

  accessTokenRequest(authCode: string) {
    console.log('The code', authCode);
    this.http.post(
      'http://localhost:3000/auth',
      JSON.stringify({
        region: 'eu',
        code: authCode,
        redirectURI: location.origin
      }))
      .toPromise()
      .then((response: string) => {
        this.setAccessToken(response);
      })
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


export const authConfig: AuthConfig = {
  issuer: 'https://eu.battle.net/oauth/authorize',
  redirectUri: window.location.origin + '/index.html',
  clientId: BLIZZARD.CLIENT_ID,
  scope: 'wow.profile sc2.profile',
};

