var settings = (settings === undefined)?{}:settings;
function setup() {
    //loadColors
    settings.color.load();
    createCanvas(windowWidth,windowHeight);
    background(settings.color.black);
    settings.cast.appID = '3BA5849C';
    settings.cast.init();
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
function draw() {
    background(settings.color.black);
    if(settings.cast.isAvailable) {
        fill(settings.color.white);
        rect(100, 100, 250, 60);
        fill(settings.color.black);
        text('Start', 110, 105, 230, 50);
    }
}

function keyReleased() {
    return false;
}

function mouseReleased() {
    if(settings.cast.isAvailable) {
        if((mouseX > 100 && mouseX < 350) && mouseY > 100 && mouseY < 160) {
            print('ok');
            settings.cast.launchApp();
        }
    }
}