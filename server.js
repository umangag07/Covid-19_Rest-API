const http = require('http');
const app = require('./app');

const Port = 3000;
const server = http.createServer(app);

server.listen(Port);