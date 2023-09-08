const BG_COLOR = '#231f20';
const SNAKE_COLOR = '#c2c2c2';
const FOOD_COLOR = '#e66916'

const gameScreen = document.getElementById('gameScreen');
const socket = io('http://localhost:8000', {transports: ['websocket']});


socket.on('init', handleInit)
socket.on('gameState', handleGameState)





let canvas, ctx;


function init() {
    canvas =  document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = canvas.height = 600
    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    document.addEventListener('keydown', onKeyDown)
}

function onKeyDown(e) {
    // console.log(e.keyCode)
    socket.emit('keydown', e.keyCode)
}

init();

function paintGame(state) {
    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const { player, food, gridSize } = state
    const size = canvas.width / gridSize // how many pixels represent one square

    ctx.fillStyle = FOOD_COLOR
    ctx.fillRect(food.x * size, food.y * size, size, size)

    paintPlayer(player, size, SNAKE_COLOR)
}

function paintPlayer(playerState, size, color) {
    const { snake } = playerState
    ctx.fillStyle = color
    for (let cell of snake) {
        ctx.fillRect(cell.x*size, cell.y*size, size, size)
    }
}

function handleInit(msg) {
    console.log(msg)
}

function handleGameState(gameState) {
    gameState = JSON.parse(gameState)
    requestAnimationFrame(() => paintGame(gameState))
}

