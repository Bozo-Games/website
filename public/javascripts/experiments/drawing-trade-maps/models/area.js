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
        mountain: '#abba88',

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
    this.size = (json.size == undefined) ? getRandomObjectKey(settings.area.size) : json.size;
};
Area.prototype.buildJSON = function() {
    return {
        center: this.center,
        type:this.type,
        size: this.size
    };
};
Area.prototype.draw = function () {
    fill(settings.color[this.type]);
    //(x - center_x)^2 + (y - center_y)^2 < radius^2
    if(Math.pow(mouseX - this.center.x,2) + Math.pow(mouseY - this.center.y,2) < Math.pow(settings.area.size[this.size],2) ) {
        stroke(settings.color.white);
        strokeWeight(2);
        debugArea = this;
    } else {
        noStroke();
    }
    ellipse(this.center.x,this.center.y, settings.area.size[this.size]*2);
};

Area.prototype.debugText = function() {
    var s = "Area ("+this.center.x+','+this.center.y+') \t- ' +this.size + " \t- "+this.type;
    return s;
};
