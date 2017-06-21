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
        center: this.center,
        type:this.type,
        size: this.size
    };
};
Road.prototype.draw = function () {

};