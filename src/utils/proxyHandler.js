import httpProxy from "http-proxy"
const apiProxy = httpProxy.createProxyServer();

function createProxyHandler(targetUrl) {
    return (req, res) => {
        apiProxy.web(req, res, { target: targetUrl }, (error) => {
            if (error) {
                console.error('Proxy error:', error);
                res.status(500).send('Proxy error');
            }
        });
    };
}

export default createProxyHandler