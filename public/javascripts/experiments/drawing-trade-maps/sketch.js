var settings = (settings === undefined)?{}:settings;
var tradeSettings = {
    canvasSize: {
        w: 800,
        h: 600,
    }
};
settings = mergeSettings(settings,tradeSettings);
var land;
var debugRegion;

function setup() {
    settings.color.load();
    createCanvas(settings.canvasSize.w,settings.canvasSize.h);
    land = new Land({});
    background(settings.color.black);
}

function draw() {

    background(settings.color.black);
    land.draw();
    if(debugRegion != undefined) {
        fill(settings.color.white);
        text(debugRegion.debugText(),0,20);
    }
    //noLoop();
}