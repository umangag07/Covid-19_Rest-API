const http = require('http');
const app = require('./app');
const server = http.createServer(app);
server.listen(process.env.PORT, '0.0.0.0');
//comment
// 2
