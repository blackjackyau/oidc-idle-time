import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { OidcAuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { from, Subject } from 'rxjs';
import { switchMap, throttleTime, catchError } from 'rxjs/operators';
import { OktaAuthService } from '../okta/okta-auth.service';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  //https://stackoverflow.com/questions/42041885/throttling-http-requests-before-theyre-made
  sessionExtendSubject = new Subject<boolean>();

  constructor(private authService: OidcAuthService, private oktaAuthService: OktaAuthService, private router: Router) {
    this.sessionExtendSubject.asObservable().pipe(
      throttleTime(environment.sessionExtendRateLimit), // rate limit
      switchMap(() => {
        return this.oktaAuthService.extendSession();    
      })
    ).subscribe();
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    let request = req;
    if (req.url.startsWith(environment.relyingPartyUrl)) {
      this.extendSession();
      if (this.authService.accessTokenisExpired()) {
        return from(this.authService.renew()).pipe(
          switchMap(() => {
            const authReq = this.insertAuthHeader(req);
            return next.handle(authReq);
          }),
          catchError(() => {
            this.router.navigateByUrl('logout');
            return EMPTY;
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
    this.sessionExtendSubject.next(true);
  }
}