var settings = (settings === undefined)?{}:settings;
findSettings = {
    state: "new",
    stateOptions: {
        new: "new",
        running: "running"
    },
    buttons: {
        start: {
            x: {p: 0.25,min: 0},
            y: {p: 0.1,min: 20},
            h: {p: 0.2,min:40},
            w: {p: 0.5,min:100},
            text: 'START',
            color: 'white',
            textColor: 'black',
            mouseUp: function () {
                if(settings.cast.isAvailable && !settings.cast.isLoaded) {
                    var r = getBoundingBoxForBtnNamed("start");
                    if((mouseX > r.x.min && mouseX < r.x.max) && mouseY > r.y.min && mouseY < r.y.max) {

                        settings.cast.onRequestSessionSuccess = function (e) {
                            console.log("Successfully created session: " + e.sessionId);
                            settings.cast.session = e;
                            settings.cast.isLoaded = true;
                        };
                        settings.cast.onLaunchError = function (e) {
                            settings.cast.isLoaded = false;
                            settings.buttons.start.color = 'red';
                            settings.buttons.start.text = 'Try Again';
                            settings.buttons.start.textColor = 'cyan';
                        };
                        document.getElementById('bozo_header').remove();
                        fullscreen(true);
                        settings.cast.launchApp();
                    }
                }
            },
            draw: function () {
                if(settings.cast.isAvailable && !settings.cast.isLoaded) {
                    drawBtn('start');
                }
            }
        },

        clear: {
            x: {p: 0.1,min: 0},
            y: {p: 0.1,min: 20},
            h: {p: 0.05,min:40},
            w: {p: 0.3, min:100},
            text: 'Clear',
            color: 'white',
            textColor: 'black',
            mouseUp: function () {
                if(settings.cast.isAvailable && !settings.cast.isLoaded) {
                    var r = getBoundingBoxForBtnNamed("start");
                    if((mouseX > r.x.min && mouseX < r.x.max) && mouseY > r.y.min && mouseY < r.y.max) {
                        //here is for socekts.io
                    }
                }
            },
            add: function () {
                if(settings.cast.isAvailable && settings.cast.isLoaded) {
                    drawBtn('clear');
                }
            },
            remove: function() {

            }
        }
    }
};
settings = mergeSettings(settings,findSettings);

var connectScreen,mainScreen,connectButton;
function setup() {
    //loadColors
    settings.color.load();
    noCanvas();

    settings.cast.appID = '3BA5849C';
    settings.cast.init();

    connectScreen = createDiv('');
    connectScreen.class('connectScreen');

    connectButton = createButton('Start');
    connectButton.mouseReleased(connectToTVWithChromeCast);

    connectScreen.child(connectButton);

}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
function draw() {
}

function keyReleased() {
    return false;
}

function mouseReleased() {
}


function connectToTVWithChromeCast() {
    settings.cast.onRequestSessionSuccess = function (e) {
        console.log("Successfully created session: " + e.sessionId);
        settings.cast.session = e;
        settings.cast.isLoaded = true;
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