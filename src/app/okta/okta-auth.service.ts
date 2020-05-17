import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class OktaAuthService {

  readonly oktaUrl = environment.oktaUrl;

  public renewState$ = new BehaviorSubject(false);

  constructor(private http: HttpClient) { }

  signIn({ username, password }): Observable<any> {
    return this.http.post<any>(`${this.oktaUrl}/api/v1/authn`, {
      username, password, options: {
        warnBeforePasswordExpired: true,
        multiOptionalFactorEnroll: false
      }
    }).pipe(
      tap(result => {
        console.log(result);
      })
    );
  }

  extendSession(): Observable<any> {
    return this.http.get<any>(`${this.oktaUrl}/api/v1/sessions/me`, { withCredentials: true }).pipe(
      tap(result => {
        this.renewState$.next(true);
        console.log(result);
      })
    );
  }

}
