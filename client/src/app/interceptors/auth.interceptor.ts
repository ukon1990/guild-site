import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthService} from '../services/auth.service';
import {Observable} from 'rxjs/internal/Observable';
import {BLIZZARD} from '../../../../server/secrets';
import {Router} from '@angular/router';
import {StringUtil} from '../utils/string.util';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(private route: Router, private service: AuthService) {
  }

  intercept(r: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {

    if (BLIZZARD.ACCESS_TOKEN) {
      if (StringUtil.contains(r.url, 'battle.net')) {
        return handler.handle(
          r.clone({
            headers: r.headers
              .set('Authorization', `Bearer ${BLIZZARD.ACCESS_TOKEN}`)
              .set('Content-Type', 'application/json')
          }));
      }
    }

    return handler.handle(r);
  }
}
