var areaSettings = {
    area: {
        types: {
            lake: 'lake',
            plain: 'plain',
            marsh: 'marsh',
            desert: 'desert',
            mountain: 'mountain'
        },
        size: {
            small: 10,
            medium: 20,
            large: 30
        }
    },
    colorStrings: {
        lake: '#1045de',
        plain: '#97ff22',
        marsh: '#368866',
        desert: '#ffff55',
        forest: '#36dd55',
        mountain: '#abba88'
    }
};
var settings = (settings === undefined)?{}:settings;
settings = mergeSettings(settings,areaSettings);

// -------------------------------------------------------------- Area
function Area(json) {
    this.loadJSON(json);
}
Area.prototype.loadJSON  = function(json) {
    this.center = json.center;
    this.type = json.type;

};
Area.prototype.buildJSON = function() {
    return {
        center: this.center,
        type:this.type
    };
};
Area.prototype.draw = function () {
    fill(settings.color[this.type]);
    ellipse(this.center.x,this.center.y, settings.area.size.small);
};
