const http = require("http");
const port = 4000 || process.env.PORT;

const server = http.createServer((clientRequest, clientResponse) => {
  const options = {
    hostname: "ipaddress",
    port: 3500,
    path: "/api/stuff",
    method: clientRequest.method,
    headers: clientRequest.headers,
  };
  makeRequest(options, clientRequest, clientResponse);
});

const makeRequest = (options, clientRequest, clientResponse) => {
  const proxy = http.request(options, (res) => {
    console.log(res);
    clientRequest.writeHead(res.statusCode, res.headers);
    res.pipe(clientResponse, { end: true });
  });
  clientRequest.pipe(proxy, { end: true });
};
server.listen(port, () => console.log(`proxy server running on ${port}`));
