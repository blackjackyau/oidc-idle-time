import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, from, of } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { OidcAuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private authService: OidcAuthService,
    private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return from(this.authService.isAuthenticatedAsync()).pipe(
      switchMap(authenticated => {
        if (!authenticated) {
          return of(true);
        }
        return this.homeRedirect();
      })
    );
  }

  homeRedirect(): Observable<boolean> {
    return of(false).pipe(
      tap(_ => {
        this.router.navigateByUrl('home');
      })
    );
  }

}
