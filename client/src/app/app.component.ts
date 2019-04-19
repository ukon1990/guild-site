import {Component, OnDestroy} from '@angular/core';
import {NavigationEnd, Route, Router} from '@angular/router';
import {AuthService} from './services/auth.service';
import { SubscriptionsUtil } from './utils/subscriptions.util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  subscriptions = new SubscriptionsUtil();

  constructor(private routeService: Router, private authService: AuthService) {
    this.subscriptions.add(
      this.routeService.events,
      (event) => {
      if (event instanceof NavigationEnd) {
        const res = /code=[a-zA-Z0-9]{3,40}/.exec((event as NavigationEnd).urlAfterRedirects);
        if (res && res !== null && res.length > 0) {
          const code = res[0].replace('code=', '');
          this.authService.setAuthCode(code);
        }
      }
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
