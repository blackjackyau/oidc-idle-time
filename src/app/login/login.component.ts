import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '../okta/okta-auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OidcAuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  isSubmitted = false;

  constructor(private oktaAuthService: OktaAuthService,
              private authService: OidcAuthService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      ssws: ['']
    });
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }
    this.oktaAuthService.signIn(this.loginForm.value)
      .subscribe(result => {
        const param = {
          sessionToken: result.sessionToken,
        }
        this.authService.loginWithRedirect(param);
      });
  }

}
