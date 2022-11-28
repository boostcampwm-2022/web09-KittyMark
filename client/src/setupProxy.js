// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    createProxyMiddleware('/oauth2.0', {
      target: 'https://nid.naver.com',
      changeOrigin: true,
    }),
  );
  app.use(
    createProxyMiddleware('/api', {
      target: 'http://localhost:4000',
      changeOrigin: true,
      pathRewrite: {
        '^/api/': '/', // remove base path
      },
    }),
  );
};
