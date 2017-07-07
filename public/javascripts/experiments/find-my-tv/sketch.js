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
            draw: function () {
                if(settings.cast.isAvailable && settings.cast.isLoaded) {
                    drawBtn('clear');
                }
            }
        }
    }
};
settings = mergeSettings(settings,findSettings);



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

    var keys = Object.keys(settings.buttons);
    for(var i = 0;  i <  keys.length; i++) {
        settings.buttons[keys[i]].draw();
    }
}

function keyReleased() {
    return false;
}

function mouseReleased() {
    var keys = Object.keys(settings.buttons);
    for(var i = 0;  i <  keys.length; i++) {
        settings.buttons[keys[i]].mouseUp();
    }
}

function drawBtn(name) {

    if(settings.buttons[name] !== undefined) {
        var r = getBoundingBoxForBtnNamed(name);
        fill(settings.color[settings.buttons[name].color]);
        rect(r.x.min, r.y.min, r.w, r.h);
        fill(settings.color[settings.buttons[name].textColor]);
        textAlign(CENTER, CENTER);
        text(settings.buttons[name].text, r.x.min, r.y.min, r.w, r.h);
    }

}

function getBoundingBoxForBtnNamed(name) {
    var xMin,yMin,w,xMax,h,yMax;
    if(settings.buttons[name] !== undefined) {
        xMin =        Math.max(settings.buttons[name].x.min, map(settings.buttons[name].x.p,0,1,0,windowWidth));
        yMin =        Math.max(settings.buttons[name].y.min, map(settings.buttons[name].y.p,0,1,0,windowHeight));
        w = Math.max(settings.buttons[name].w.min, map(settings.buttons[name].w.p,0,1,0,windowWidth));
        xMax = xMin + w;
        h =  Math.max(settings.buttons[name].h.min, map(settings.buttons[name].h.p,0,1,0,windowHeight));
        yMax = yMin + h;
    }
    return {x: {min:xMin, max:xMax}, y:{min:yMin,max:yMax},w:w,h:h};
}