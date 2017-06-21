var settings = (settings === undefined)?{}:settings;
var tradeSettings = {
    canvasSize: {
        w: 800,
        h: 600,
    },
    colorStrings: {
        black: '#000000'
    },
    areaCount: 20,
};
settings = mergeSettings(settings,tradeSettings);

var areas = [];

function setup() {
    settings.color.load();
    createCanvas(settings.canvasSize.w,settings.canvasSize.h);
    areas = [];
    for(var i = 0; i < settings.areaCount; i++) {
        var a = new Area(
            {
                center: {
                    x: getRandomInt(1,settings.canvasSize.w) ,
                    y:getRandomInt(1,settings.canvasSize.h)
                },
                type: getRandomObject(settings.area.types)
            });
        areas.push(a);
    }
    background(settings.color.black);
}

function draw() {
    clear();
    background(settings.color.black);
    areas.forEach( function (item, index) {
        item.draw();
    });

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