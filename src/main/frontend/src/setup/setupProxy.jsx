const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://www.sejongglobalbuddy.kr', // 백엔드 주소
            changeOrigin: true,
        })
    );
};
