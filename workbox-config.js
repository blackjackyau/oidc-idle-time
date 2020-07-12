const doNothingCb = async ({ url, request, event, params }) => {
  return await fetch(request);
};

module.exports = {
  globDirectory: './dist/oidc-idle-time/',
  globPatterns: [
    '\*\*/\*.{js,css,html}'
  ],
  swDest: './dist/oidc-idle-time/sw.js',
  runtimeCaching: [
    {
      urlPattern: /sockjs-node/,
      handler: doNothingCb
    },
    {
      urlPattern: /\?code=/, // filter code callback cache
      handler: doNothingCb
    },
    {
      urlPattern: /.+/,
      handler: 'CacheFirst'
    }
  ],
  clientsClaim: true,
  skipWaiting: true
};