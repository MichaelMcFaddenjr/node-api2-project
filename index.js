const server = require('./api/server');

const PORT = 5000;

server.listen(PORT, () => {
  console.log('Server Running on http://localhost:5000');
})