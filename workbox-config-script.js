module.exports = {
  globDirectory: './dist/oidc-idle-time/',
  globPatterns: [
    '*.{js,css,html}', // do first level only to avoid premature cache of workbox lib
    'workbox/workbox-v5.1.3/workbox-sw.js'
  ],
  swDest: './dist/oidc-idle-time/sw.js',
  swSrc: './src/custom-sw.js',
};