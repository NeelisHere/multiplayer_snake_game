const BG_COLOR = '#231f20';
const SNAKE_COLOR = '#c2c2c2';
const FOOD_COLOR = '#e66916'

const socket = io('http://localhost:8000', {transports: ['websocket']});
socket.on('init', handleInit)
socket.on('gameState', handleGameState)
socket.on('gameOver', handleGameOver)

const gameScreen = document.getElementById('gameScreen');
const initialScreen = document.getElementById('initialScreen');
const newGameButton = document.getElementById('newGameButton')
const joinGameButton = document.getElementById('joinGameButton')
const gameCodeInput = document.getElementById('gameCodeInput')

newGameButton.addEventListener('click', newGame)
joinGameButton.addEventListener('click', joinGame)

function newGame() {
    socket.emit('newGame')
    init()
}



function joinGame() {
    const code = gameCodeInput.value
    socket.emit('joinGame', code)
    init()
}

let canvas, ctx;

function init() {
    initialScreen.style.display = 'none'
    gameScreen.style.display = 'block'
    
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

function handleGameOver() {
    alert('You lose!')
}

