var settings = (settings === undefined)?{}:settings;
var tradeSettings = {
    canvasSize: {
        w: 800,
        h: 600,
    },
    colorStrings: {
    },
    areaCount: 20,
};
settings = mergeSettings(settings,tradeSettings);

var areas = [];
var debugArea;

function setup() {
    settings.color.load();
    createCanvas(settings.canvasSize.w,settings.canvasSize.h);
    areas = [];
    for(var i = 0; i < settings.areaCount; i++) {
        var a = new Area(
            {
                center: {
                    x: getRandomInt(1,settings.canvasSize.w) ,
                    y:getRandomInt(1,settings.canvasSize.h)
                },
                type: getRandomObject(settings.area.types)
            });
        areas.push(a);
    }
    background(settings.color.black);
}

function draw() {
    clear();
    background(settings.color.black);
    areas.forEach( function (item, index) {
        item.draw();
    });
    if(debugArea != undefined) {
        print('here');
        fill(settings.color.white);
        text(debugArea.debugText(),0,20);
    }
}