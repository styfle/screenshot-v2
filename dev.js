const { createServer } = require('http');
const { lambda } = require('./lambda');
const PORT = 3000;
const handleListen = () => console.log(`Listening on ${PORT}...`);
createServer(lambda).listen(PORT, handleListen);