console.log(settings);
var settings = (settings === undefined)?{}:settings;
var snakeSettings = {
    gameSpeed:15,
    square: {
        w:15,
        h:15
    },
    gridSize: {
        w: 30,
        h: 30
    },
    colorStrings: {
        head: '#00ffff',
        body: '#00ff00',
        apple: '#ff0000',
        ground: '#000000',
        text: '#ffffff'
    }
};
settings = Object.assign(settings,snakeSettings);
var up = {x: 0, y: -1};
var down = {x: 0, y: 1};
var left = {x: -1, y: 0};
var right = {x: 1, y: 0};

var snake = {
    vol: undefined,
    head: undefined,
    history: []
};
var apple = undefined;

function setup() {
    createCanvas(settings.square.w * settings.gridSize.w,settings.square.h * settings.gridSize.h);
    /*settings.color = {};
    for (var key in settings.colorStrings) {
        settings.color[key] = color(settings.colorStrings[key]);
    }*/
    background(settings.color.ground);
}

function draw() {
    clear();
    background(settings.color.ground);
    if(snake.head === undefined) {
        fill(settings.color.text);
        textAlign(CENTER);
        rectMode(CENTER);
        text("Game Over\nscore: " + snake.history.length, canvas.width / 2, canvas.height / 2,canvas.width,50);
        text("(space bar for new game)", canvas.width / 2, canvas.height - 50,canvas.width,50);
    } else {
        if(frameCount % settings.gameSpeed == 0) {
            moveSnake();
            checkForApple();
            checkForDeath();
        }
        if(snake.head) {
            var animation = 0;// (frameCount % settings.gameSpeed) / settings.gameSpeed;
            rectMode(CORNER);
            //draw head
            fill(settings.color.head);
            rect(
                (snake.head.x + snake.vol.x * animation) * settings.square.w,
                (snake.head.y + snake.vol.y * animation) * settings.square.h,
                settings.square.w, settings.square.h);

            //draw body
            fill(settings.color.body);
            for (var i = snake.history.length - 1; i >= 0; i--) {
                var loc = snake.history[i];
                rect(
                    loc.x * settings.square.w,
                    loc.y * settings.square.h,
                    settings.square.w, settings.square.h);

            }
            //draw apple

            fill(settings.color.apple);
            rect(
                apple.x * settings.square.w,
                apple.y * settings.square.h,
                settings.square.w, settings.square.h);
        }
    }
}

function keyReleased() {
    if(snake.head === undefined) {
        if(keyCode == 32) {
            newGame();
        }
    } else {
        print(keyCode);
        if(keyCode == 37) {
            setSnakeDir(left);
        } else if(keyCode == 38) {
            setSnakeDir(up);
        } else if (keyCode == 39) {
            setSnakeDir(right);
        } else if (keyCode == 40) {
            setSnakeDir(down);
        }
    }
    return false; // prevent any default behavior
}
function checkForDeath() {
    for(var i = 0; i < snake.history.length-1; i++) {
        var loc = snake.history[i];
        if(loc.x == snake.head.x && loc.y == snake.head.y) {
            snake.head = undefined;
            break;
        }
    }
}
function checkForApple() {
    if(snake.head.x == apple.x && snake.head.y == apple.y) {
        snake.history.push({x:snake.head.x,y:snake.head.y});
        newApple();
    }
}
function newGame() {
    var startX = getRandomInt(0,settings.gridSize.w-1);
    var startY = getRandomInt(0,settings.gridSize.h-1);
    snake.head = {x:startX,y:startY};
    snake.history = [];
    snake.vol = up; //TODO make random
    newApple();
}
function newApple() {
    var startX = getRandomInt(0,settings.gridSize.w-1);
    var startY = getRandomInt(0,settings.gridSize.h-1);
    apple = {x:startX,y:startY};
}
function moveSnake() {
    var newHistroy = [];
    print(snake.history.length);
    for(var i = 0; i <snake.history.length - 1 ; i++) {
        newHistroy.push(snake.history[i+1]);
    }
    newHistroy.push({x:snake.head.x,y:snake.head.y});
    snake.history = newHistroy;

    snake.head.x += snake.vol.x;
    snake.head.y += snake.vol.y;
    if(snake.head.x < 0) {
        snake.head.x = settings.gridSize.w -1;
    } else if (snake.head.x >= settings.gridSize.w ) {
        snake.head.x = 0;
    }
    if(snake.head.y < 0) {
        snake.head.y = settings.gridSize.h -1;
    } else if (snake.head.y >= settings.gridSize.h ) {
        snake.head.y = 0;
    }
}

function setSnakeDir(dir) {
    if (dir.x != 0) {
        if(snake.vol.x != -1 * dir.x) { //as long as not a 180 process
            snake.vol = dir;
        }
    } else {
        if(snake.vol.y != -1 * dir.y) { //as long as not a 180 process
            snake.vol = dir;
        }
    }
}
/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}