var settings = (settings === undefined)?{}:settings;
settings.cast = {
    isLoaded: false
};
function setup() {
    //loadColors
    settings.color.load();
    createCanvas(windowWidth,windowHeight);
    background(settings.color.black);

    var loadCastInterval = setInterval(function(){
        if (chrome.cast.isAvailable) {
            console.log('Cast has loaded.');
            clearInterval(loadCastInterval);
            initializeCastApi();
        } else {
            console.log('Unavailable');
        }
    }, 1000);
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
function draw() {
    background(settings.color.black);
    if(settings.cast.isLoaded) {
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
    if(settings.cast.isLoaded) {
        if((mouseX > 100 && mouseX < 350) && mouseY > 100 && mouseY < 160) {
            print('ok');
            launchApp();
        }
    }
}
//------------------------ chrome cast stuff
function initializeCastApi() {
    var applicationID = chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID;
    var sessionRequest = new chrome.cast.SessionRequest(applicationID);
    var apiConfig = new chrome.cast.ApiConfig(sessionRequest,
        sessionListener,
        receiverListener);
    chrome.cast.initialize(apiConfig, onInitSuccess, onInitError);
};

function sessionListener(e) {
    session = e;
    console.log('New session');
    if (session.media.length != 0) {
        console.log('Found ' + session.media.length + ' sessions.');
    }
}

function receiverListener(e) {
    if( e === 'available' ) {
        settings.cast.isLoaded = true;
        console.log("Chromecast was found on the network.");
    }
    else {
        console.log("There are no Chromecasts available.");
    }
}

function onInitSuccess() {
    console.log("Initialization succeeded");
}

function onInitError() {
    console.log("Initialization failed");
}

function launchApp() {
    console.log("Launching the Chromecast App...");
    chrome.cast.requestSession(onRequestSessionSuccess, onLaunchError);
}

function onRequestSessionSuccess(e) {
    console.log("Successfully created session: " + e.sessionId);
    session = e;
}

function onLaunchError() {
    console.log("Error connecting to the Chromecast.");
}

function onRequestSessionSuccess(e) {
    console.log("Successfully created session: " + e.sessionId);
    session = e;
    loadMedia();
}

function loadMedia() {
    if (!session) {
        console.log("No session.");
        return;
    }

    var mediaInfo = new
    chrome.cast.media.MediaInfo('http://i.imgur.com/IFD14.jpg');
    mediaInfo.contentType = 'image/jpg';

    var request = new chrome.cast.media.LoadRequest(mediaInfo);
    request.autoplay = true;

    session.loadMedia(request, onLoadSuccess, onLoadError);
}

function onLoadSuccess() {
    console.log('Successfully loaded image.');
}

function onLoadError() {
    console.log('Failed to load image.');
}

function stopApp() {
    session.stop(onStopAppSuccess, onStopAppError);
}

function onStopAppSuccess() {
    console.log('Successfully stopped app.');
}

function onStopAppError() {
    console.log('Error stopping app.');
}