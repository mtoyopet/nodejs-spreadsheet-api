const content = require('fs').readFileSync(__dirname + '/index.html', 'utf8')

const httpServer = require('http').createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html')
  res.setHeader('Content-Length', Buffer.byteLength(content))
  res.end(content)
})

const io = require('socket.io')(httpServer, {
  cors: {
    origin: "http://localhost:5000/socket.io",
    methods: ["GET", "POST"]
  }
})

io.on('connection', socket => {
  console.log('Hello')
  socket.emit('chat-message', 'Hello world')
})

httpServer.listen(5000, () => {
  console.log('go to localhost:5000')
})