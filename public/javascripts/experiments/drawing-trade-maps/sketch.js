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
var v;
var diagram;
function setup() {
    settings.color.load();
    createCanvas(settings.canvasSize.w,settings.canvasSize.h);
    land = new Land({});
    background(settings.color.black);
    v = new Voronoi();
    var bbox = {xl: 0, xr: 800, yt: 0, yb: 600}; // xl is x-left, xr is x-right, yt is y-top, and yb is y-bottom
    var sites = [ {x: 200, y: 200}, {x: 50, y: 250}, {x: 400, y: 100} /* , ... */ ];
    diagram = v.compute(sites, bbox);
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