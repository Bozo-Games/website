// -------------------------------------------------------------- Road
function Road(json) {
    this.loadJSON(json);
}
Road.prototype.loadJSON  = function(json) {
    this.org = json.org;
    this.dest = json.dest;
};
Road.prototype.buildJSON = function() {
    return {
        org:this.org,
        dest:this.dest,
    };
};
Road.prototype.draw = function (kingdom) {
    stroke(settings.color.lightGray);
    var x1 = kingdom.areas[this.org].center.x;
    var y1 = kingdom.areas[this.org].center.y;
    var x2 = kingdom.areas[this.dest].center.x;
    var y2 = kingdom.areas[this.dest].center.y;
    line(x1,y1,x2,y2);
    fill(settings.color.white);
    var p = settings.area.size[kingdom.areas[this.org].size] / (settings.area.size[kingdom.areas[this.org].size] + settings.area.size[kingdom.areas[this.dest].size]);
    var mid = getMidPoint(x1,y1,x2,y2,p);

    ellipse(mid.x,mid.y,10);
};