const httpProxy = require('http-proxy');
const serveHandler = require('serve-handler');
const http = require('http');

const port = 3000;

const proxy = httpProxy.createProxyServer({
  changeOrigin: true,
  target: 'https://campaignscope-data-api-dot-nyt-adtech-dev.appspot.com',
});

/** @see https://stackoverflow.com/a/27177380/1991086 */
proxy.on('error', function(error, _req, res) {
  var json;
  // console.log('proxy error', error);
  if (!res.headersSent) {
    res.writeHead(500, { 'content-type': 'application/json' });
  }

  json = { error: 'proxy_error', reason: error.message };
  res.end(JSON.stringify(json));
});

const server = http.createServer((request, response) =>
  request.url.match(/^\/cs\b/)
    ? proxy.web(request, response)
    : serveHandler(request, response, { public: 'static' })
);

server.listen(port, () => {
  console.log(`Running at http://localhost:${port}`);
});
