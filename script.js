var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var snakeBody = [];

var moveX = 0;
var moveY = 0;

var foodX;
var foodY;

const replay = document.getElementById("replay");
var score = document.getElementById("score");
var gameOver = false;


window.onload = function(){
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");
    
    placefood();
    document.addEventListener("keyup", changeDirection);
    replay.addEventListener("click", restartGame);
    setInterval(update, 1000/10);
}

function update(){

    if(gameOver){
        return;
    }

    context.fillStyle = "black";
    context.fillRect(0,0, board.width, board.height);

    context.fillStyle = "#F2F7A1";
    context.fillRect(foodX, foodY, blockSize, blockSize);
    

    if(snakeX == foodX && snakeY == foodY){
        snakeBody.push([foodX, foodY])
        placefood()

        score.textContent = parseInt(score.textContent) + 1;
    }

    
    for(let i = snakeBody.length-1; i > 0; i--){
        snakeBody[i] = snakeBody[i - 1];
    }
    if(snakeBody.length){
        snakeBody[0] = [snakeX, snakeY]
    }

    context.fillStyle = "#2E8A99";
    snakeX += moveX * blockSize;
    snakeY += moveY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for(let i = 0; i < snakeBody.length; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    if(snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize){
        gameOver = true;
        replay.textContent = "GAME OVER! Click ME to REPLAY"
        replay.style.width = "300px"
        replay.style.border = "2px solid #2E8A99"
    } 
    for(let i = 0; i < snakeBody.length; i++){
        if(snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
            gameOver = true;
            replay.textContent = "GAME OVER! Click to REPLAY"
            replay.style.width = "300px"
            replay.style.border = "2px solid #2E8A99"
        }
    }
}

function placefood(){
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * cols) * blockSize;
}

function changeDirection(event){
    if(event.code == "ArrowUp" && moveY != 1){
        moveX = 0;
        moveY = -1;
    }
    else if(event.code == "ArrowDown" && moveY != -1){
        moveX = 0;
        moveY = 1;
    }
    else if(event.code == "ArrowLeft" && moveX != 1){
        moveX = -1;
        moveY = 0;
    }
    else if(event.code == "ArrowRight" && moveX != -1){
        moveX = 1;
        moveY = 0;
    }
}

function restartGame(){
    snakeX = blockSize * 5;
    snakeY = blockSize * 5;
    snakeBody = [];
    moveX = 0;
    moveY = 0;
    gameOver = false;
    score.textContent = "0";
    replay.textContent = "Use ⬆️⬇️➡️⬅️ KEYS to Play";
    replay.style.border = "none";
    placefood();
}