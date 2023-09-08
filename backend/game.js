const { GRID_SIZE } = require('./constants.js')

module.exports = {
    createGameState,
    gameLoop,
    getUpdatedVelocity
}

function createGameState() {
    return {
        player: {
            pos: { x: 3, y: 10 },
            vel: { x: 1, y: 0 },
            snake: [
                { x: 1, y: 10 },
                { x: 2, y: 10 },
                { x: 3, y: 10 },
            ]
        },
        food: { x: 7, y: 7 },
        gridSize: GRID_SIZE
    }
}

function isInside(player) {
    if (player.pos.x < 0 || player.pos.x > GRID_SIZE || player.pos.y < 0 || player.pos.y > GRID_SIZE) {
        return false
    } else return true;
}

function gameLoop(state) {
    if (!state) {
        return;
    }

    const player1 = state.player

    player1.pos.x += player1.vel.x
    player1.pos.y += player1.vel.y

    if (!isInside(player1)) {
        return 2;
    }

    if (state.food.x === player1.pos.x && state.food.y === player1.pos.y) {
        player1.snake.push({ ...player1.pos })
        player1.pos.x += player1.vel.x
        player1.pos.y += player1.vel.y
        randomFood(state)
    }

    if (player1.vel.x || player1.vel.y) {
        for (let cell of player1.snake) {
            if (cell.x === player1.pos.x && cell.y === player1.pos.y) {
                return 2;
            }
        }
        player1.snake.push({ ...player1.pos });
        player1.snake.shift()
    }

    return false;
}

function randomFood(state) {
    food = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
    }

    for (let cell of state.player.snake) {
        if(cell.x === food.x && cell.y === food.y){
            randomFood(state)
        }
    }

    state.food = food
}

function getUpdatedVelocity(keyCode) {
    // 37-L, 38-D, 39-R, 40-U
    switch(keyCode) {
        case 37: {
            return { x: -1, y: 0 }
        }
        case 38: {
            return { x: 0, y: -1 }
        }
        case 39: {
            return { x: 1, y: 0 }
        }
        case 40: {
            return { x: 0, y: 1 }
        }
    }
}