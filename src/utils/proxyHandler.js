import httpProxy from "http-proxy"
const apiProxy = httpProxy.createProxyServer();

function createProxyHandler(targetUrl) {
    return (req, res) => {
        apiProxy.web(req, res, { target: targetUrl,changeOrigin: true }, (error) => {
            console.error('Proxy error new:', error);
            if (error.code) {
                console.error('Proxy error code:', error.code);
            }
            res.status(500).send('Proxy error');
        });
    };
}

export default createProxyHandler