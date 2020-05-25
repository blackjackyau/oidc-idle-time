import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { OidcAuthService } from '../auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OktaAuthService } from '../okta/okta-auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: {
    username
  };

  sideMenus = [
    {
      label: 'Relying Party',
      link: 'relying-party',
      icon: 'vpn_key'
    }
  ];

  mobileQuery: MediaQueryList;

  private mobileQueryListener: () => void;

  constructor(private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private oidcAuthService: OidcAuthService,
    private oktaAuthService: OktaAuthService,
    private snackBar: MatSnackBar,
    private media: MediaMatcher) { }

  ngOnInit() {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => {
      this.changeDetectorRef.detectChanges();
    };
    this.mobileQuery.addListener(this.mobileQueryListener);
    this.user = this.oidcAuthService.getCurrentUser();

    this.oidcAuthService.renewState$.subscribe((flag) => {
      if (flag) {
        console.log('Access token renewed (15 minutes)');
        this.snackBar.open('Access token renewed (15 minutes)', '', {
          duration: 3000,
        });
      }
    });

    this.oktaAuthService.renewState$.subscribe((flag) => {
      if (flag) {
        console.log('IdP session extended for 15 minutes');
        this.snackBar.open('IdP session extended for 15 minutes', '', {
          duration: 3000,
        });
      }
    });
  }

  logout() {
    this.router.navigate(['logout']);
  }

  OnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

}