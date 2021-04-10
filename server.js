const http = require('http');
const app = require('./app');
require("dotenv/config");

const Port = process.env.Port|3000;
const server = http.createServer(app);

server.listen(Port);