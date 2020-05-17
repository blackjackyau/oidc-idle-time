import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { OidcAuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { from, Observable } from 'rxjs';
import { map, flatMap, switchMap } from 'rxjs/operators';
import { OktaAuthService } from '../okta/okta-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: OidcAuthService, private oktaAuthService: OktaAuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    let request = req;
    if (req.url.startsWith(environment.relyingPartyUrl)) {
      this.extendSession();
      if (this.authService.accessTokenisExpired()) {
        console.log('token is expired, renewing token');
        return from(this.authService.renew()).pipe(
          switchMap(() => {
            console.log('token is renewed');
            const authReq = this.insertAuthHeader(req);
            return next.handle(authReq);
          })
        )
      }

      request = this.insertAuthHeader(req);
    }

    // send cloned request with header to the next handler.
    return next.handle(request);
  }

  private insertAuthHeader(req: HttpRequest<any>): HttpRequest<any> {
    const accessToken = this.authService.getAccessToken();
    if (accessToken) {
      return req.clone({
        headers: req.headers.set('Authorization', accessToken)
      });
    }
    return req;
  }

  private extendSession() {
    this.oktaAuthService.extendSession().subscribe(() => {
      console.log('session extended');
    });
  }
}