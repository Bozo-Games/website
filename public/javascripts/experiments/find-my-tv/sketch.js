var settings = (settings === undefined)?{}:settings;
findSettings = {
    state: "new",
    stateOptions: {
        new: "new",
        running: "running"
    }
};
settings = mergeSettings(settings,findSettings);

var connectScreen,mainScreen,connectButton,clearBtn;

var socket;
function setup() {
    //socket io
    socket = io("https://" + window.location.hostname + ":3030");

    //loadColors
    settings.color.load();
    noCanvas();

    settings.cast.appID = '3BA5849C';
    settings.cast.init();

    connectScreen = createDiv('');
    connectScreen.class('bozoScreen');

    connectButton = createButton('Start');
    connectButton.class('bozoButton');
    connectButton.mouseReleased(connectToTVWithChromeCast);
    connectButton.touchEnded(connectToTVWithChromeCast);
    connectScreen.child(connectButton);

    windowResized();
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);

    if(connectScreen !== undefined) {
        connectButton.size(Math.max(100, windowWidth * 0.2), 40);
        connectButton.position(windowWidth / 2, windowHeight / 2);

        connectScreen.size(windowWidth, windowHeight);
    } else if(mainScreen !== undefined) {

        connectButton.size(Math.max(100, windowWidth * 0.2), 40);
        connectButton.position(windowWidth/ 2, windowHeight/ 2);

        mainScreen.size(windowWidth, windowHeight);
    }
}
function draw() {
}

function keyReleased() {
    return false;
}

function mouseReleased() {
}

function createMainScreen() {
    if(mainScreen === undefined) {
        mainScreen = createDiv('');

        clearBtn = createButton('Clear');
        clearBtn.class("bozoScreen")
    }
}
function sendIAmController(receiverLabel) {
    var data = {value:'find-my-tv',receiverLabel:receiverLabel};
    socket.emit('IAm',data);
}
function sendClear() {

}
var debug;

function connectToTVWithChromeCast() {
    settings.cast.onRequestSessionSuccess = function (e) {
        debug = e;
        console.log("Successfully created session: " + e.sessionId);
        settings.cast.session = e;
        settings.cast.isLoaded = true;

        connectScreen.remove();
        connectScreen = undefined;
        createMainScreen();
        sendIAmController(e.receiver.label);
    };
    settings.cast.onLaunchError = function (e) {
        settings.cast.isLoaded = false;
        /*
        settings.buttons.start.color = 'red';
        settings.buttons.start.text = 'Try Again';
        settings.buttons.start.textColor = 'cyan';*/
    };
    document.getElementById('bozo_header').remove();
    fullscreen(true);
    settings.cast.launchApp();
}