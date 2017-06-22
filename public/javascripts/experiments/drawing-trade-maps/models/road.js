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
    line(
        kingdom.areas[this.org].center.x,
        kingdom.areas[this.org].center.y,
        kingdom.areas[this.dest].center.x,
        kingdom.areas[this.dest].center.y
    );
};