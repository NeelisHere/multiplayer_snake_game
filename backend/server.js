const io = require('socket.io')()

io.on('connection', (client) => {
    client.emit('init', { data: 'hi' })
})

io.listen(8000)