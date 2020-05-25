[![Actions Status](https://github.com/blackjackyau/oidc-idle-time/workflows/Node%20CI/badge.svg)](https://github.com/blackjackyau/oidc-idle-time/actions)

# Oidc Idle Time Implementation using Okta and Angular
This project is a sample implementation of OIDC Idle Time handling described from [here](https://medium.com/@yau.yik.shiung/oidc-idle-timeout-design-5149da2be93e) in Angular project.

[Github Page (hosted)](https://blackjackyau.github.io/oidc-idle-time-page)

## Project setup
1. OP (OpenID Provider) / IdP = [OKTA](https://dev-875318.okta.com)
2. RP (Relying Party) = [dummy.restapiexample.com](http://dummy.restapiexample.com)
3. IdP session extention API [Session Me](https://developer.okta.com/docs/reference/api/sessions/#get-current-session)

## Project Walkthrough
1. Login using `sample@example.com` | `Password123`
2. Open and observe browser developer console
3. `IdP session extended for 15 minutes` indicates OP/IdP Session TTL has been extended to 15 minutes more
4. `Access token renewed (15 minutes)` indicates Access Token for RP has been renewed (also indicating IdP session is still active)
5. Simulate the "user active" activity using RP API call (Reload button), Refers to the blog for the handling details ![idle handling](https://miro.medium.com/max/657/1*9J5eaflVYv68gXCWnRIgjQ.png)

## Okta IdP Setting
Register your okta developer account (https://developer.okta.com/signup)

### Application Setting
![okta application setup](doc/okta-application-setup.png)

### IdP SSO TTL Setting
![IdP SSO setup](doc/idp-sso-ttl.png)

### RP Access Token Expiration Setup
![IdP SSO setup](doc/access-token-lifecycle.png)