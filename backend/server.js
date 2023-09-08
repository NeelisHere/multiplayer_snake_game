const io = require('socket.io')()
const { createGameState, gameLoop, getUpdatedVelocity } = require('./game.js')
const { FRAME_RATE } = require('./constants.js')

io.on('connection', (client) => {
    console.log('client connected')
    const state = createGameState()
    client.on('keydown', handleKeyDown)
    function handleKeyDown(keyCode) {
        try {
            keyCode = parseInt(keyCode)
        } catch (err) {
            console.error(err)
            return;
        }
        const vel = getUpdatedVelocity(keyCode)
        if (vel) {
            state.player.vel = vel
        }

    }
    startGameInterval(client, state)
    // client.emit('init', { data: 'hi' })
})

function startGameInterval(client, state) {
    const intervalId = setInterval(()=> {
        const winner = gameLoop(state)
        if (!winner) {
            client.emit('gameState', JSON.stringify(state))
        } else {
            client.emit('gameOver')
            clearInterval(intervalId)
        }
    }, 1000 / FRAME_RATE)
}

io.listen(8000)