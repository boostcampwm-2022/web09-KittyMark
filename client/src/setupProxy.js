// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    createProxyMiddleware('/api', {
      target: 'http://localhost:4000',
      changeOrigin: true,
      pathRewrite: {
        '^/api/': '/', // remove base path
      },
    }),
  );
  app.use(
    createProxyMiddleware('/socket.io', {
      target: 'http://localhost:2000',
      changeOrigin: true,
      ws: true,
      logLevel: 'debug',
    }),
  );
};
