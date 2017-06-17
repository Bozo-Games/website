var settings = {
    colorStrings: {
        red: '#ff0000',
        green: '#00ff00',
        blue: '#0000ff',
        cyan: '#00ffff',
        yellow: '#ffff00',
        magenta: '#ff00ff',
        black: '#000000',
        white: '#ffffff',

    }
};
function setup() {
    //loadColors
    settings.color = {};
    for (var key in settings.colorStrings) {
        settings.color[key] = color(settings.colorStrings[key]);
    }
    createCanvas(windowWidth,windowHeight);
    background(settings.color.black);
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
function draw() {
    background(settings.color.black);
}

function keyReleased() {
    if(keyCode == 32) {
        document.createElement('button', 'google-cast-button');
        print('here');
    }
    return false;
}