var settings = (settings === undefined)?{}:settings;
var pixelSettings = {
    pixel: {
        size: {
            h:10,
            w:10
        },
        color: undefined,
        position: {
            x: 0,
            y: 0
        },
        mirror: true,
        reverse: true,
        draw: function () {
            var stepX = 0;
            var stepY = 0;
            while (stepX === 0 && stepY === 0) {
                stepX = getRandomInt(-1,1) * settings.pixel.size.w;
                stepY = getRandomInt(-1,1) * settings.pixel.size.h;
            }

            settings.pixel.position.x = (settings.pixel.position.x + stepX);
            settings.pixel.position.y = (settings.pixel.position.y + stepY);
            if(settings.pixel.position.x < 0) {
                 settings.pixel.position.x += windowWidth;
            } else if(settings.pixel.position.y < 0) {
                settings.pixel.position.y += windowHeight;
            } else if(settings.pixel.position.y > windowHeight) {
                settings.pixel.position.y -= windowHeight;
            } else if(settings.pixel.position.x > windowWidth) {
                settings.pixel.position.x -= windowWidth;
            }

            settings.pixel.color.levels[0] = (255+(settings.pixel.color.levels[0] + getRandomInt(-1,1))) % 256;
            settings.pixel.color.levels[1] = (255+(settings.pixel.color.levels[1] + getRandomInt(-1,1))) % 256;
            settings.pixel.color.levels[2] = (255+(settings.pixel.color.levels[2] + getRandomInt(-1,1))) % 256;

            var xPos = settings.pixel.position.x;
            var yPos = settings.pixel.position.y;

            fill(settings.pixel.color);
            rectMode(CENTER);
            rect(xPos,yPos,settings.pixel.size.w,settings.pixel.size.h);
            if(settings.pixel.mirror) {
                rect(windowWidth-xPos,yPos,settings.pixel.size.w,settings.pixel.size.h);
                if(settings.pixel.reverse) {
                    rect(xPos,windowHeight - yPos,settings.pixel.size.w,settings.pixel.size.h);
                    rect(windowWidth-xPos,windowHeight - yPos,settings.pixel.size.w,settings.pixel.size.h);
                }
            } else if(settings.pixel.reverse) {
                rect(xPos,windowHeight - yPos,settings.pixel.size.w,settings.pixel.size.h);
            }
        }
    }
};
var SX,SY;
settings = mergeSettings(settings,pixelSettings);

function setup() {
    //loadColors
    settings.color.load();
    createCanvas(windowWidth,windowHeight);
    var c = settings.color.getRandomColorByIndex();
    console.log(c);
    settings.pixel.color = color('rgb('+c._getRed()+','+c._getGreen()+','+c._getBlue()+','+255+')');
    settings.pixel.position.x = 400;
    settings.pixel.position.x = 500;
    background(settings.color.black);

    //settings.receiver.init();
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
function draw() {
    settings.pixel.size.h = map(Math.sin(frameCount/100),-1,1,5,45);
    settings.pixel.size.w = map(Math.cos(frameCount/100),-1,1,5,45);
    settings.pixel.draw();
    fill(settings.color.black);
    rectMode(CORNER);
    fill(settings.color.black);
    rect(10,10,100,40);
    fill(settings.color.green);
    text(Math.round(frameRate(),2),12,12,96,36);
}

function keyReleased() {
    return false;
}

function mouseReleased() {

}