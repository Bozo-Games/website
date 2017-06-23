var settings = (settings === undefined)?{}:settings;
var tradeSettings = {
    canvasSize: {
        w: 400,
        h: 300,
    },
    areaCount: 20,
};
settings = mergeSettings(settings,tradeSettings);
var kingdomMap;
var debugArea;

function setup() {
    settings.color.load();
    createCanvas(settings.canvasSize.w,settings.canvasSize.h);
    kingdomMap = new KingdomMap({});
    background(settings.color.black);
}

function draw() {
    kingdomMap.draw();
    if(debugArea != undefined) {
        fill(settings.color.white);
        text(debugArea.debugText(),0,20);
    }
    noLoop();
}