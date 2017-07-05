var settings = (settings === undefined)?{}:settings;

function setup() {
    //loadColors
    settings.color.load();
    createCanvas(windowWidth,windowHeight);
    background(settings.color.black);

    window.mediaElement = document.getElementById('media');
    window.mediaManager = new cast.receiver.MediaManager(window.mediaElement);
    window.castReceiverManager = cast.receiver.CastReceiverManager.getInstance();
    window.castReceiverManager.start();

}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
function draw() {
    background(settings.color.black);
}

function keyReleased() {
    return false;
}

function mouseReleased() {

}