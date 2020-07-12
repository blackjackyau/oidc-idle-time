export const environment = {
  production: true,
  oktaUrl: 'https://dev-875318.okta.com',
  relyingPartyUrl: 'https://run.mocky.io/v3/d9293e84-c72f-46ad-8f1e-48148ba7b238',
  sessionExtendRateLimit: 60000, // 1 mins
  oidc: {
    clientId: '0oam5zkpp9nqUwpq0356',
    issuer: 'https://dev-875318.okta.com/oauth2/default',
    redirectUri: 'https://blackjackyau.github.io/oidc-idle-time-page',
    silentRedirectUri: 'https://blackjackyau.github.io/oidc-idle-time-page',
    scope: 'openid profile email',
    responseType: 'code',
    registerUri: 'https://dev-875318.okta.com/signin/register',
    postLogoutRedirectUri: 'https://blackjackyau.github.io/oidc-idle-time-page'
  }
};