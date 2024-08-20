const PROXY_CONFIG = [
    {
        context: [
            "/api",
        ],
        target: "https://api-flask-python.vercel.app",
        secure: false,
        changeOrigin: true,
        pathRewrite: { "^/": "" }
    }
]

module.exports = PROXY_CONFIG