var settings = (settings === undefined)?{}:settings;

function setup() {
    //loadColors
    settings.color.load();
    createCanvas(windowWidth,windowHeight);
    background(settings.color.red);

}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
function draw() {
    background(settings.color.red);
}

function keyReleased() {
    return false;
}

function mouseReleased() {

}