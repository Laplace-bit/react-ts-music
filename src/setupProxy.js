const { createProxyMiddleware: proxy } = require('http-proxy-middleware')

module.exports = function (app) {
    app.use(
        proxy('/nothing', {
            target: 'http://localhost:3300',
            changeOrigin: true,
            pathRewrite: { '^/nothing': '' }
        }),
        proxy('/163api', {
            target: 'http://localhost:3080',
            changeOrigin: true,
            pathRewrite: { '^/163api': '' }
        }),
        proxy('/polls01', {
            target: 'http://localhost:8000',
            changeOrigin: true,
            pathRewrite: { '^/polls01': 'polls01' }
        }),
    )
}
