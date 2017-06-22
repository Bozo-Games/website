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
        },
        randomArea: function () {
            var a = new Area(
                {
                    center: {
                        x: getRandomInt(1,settings.canvasSize.w) ,
                        y:getRandomInt(1,settings.canvasSize.h)
                    },
                    type: getRandomObject(settings.area.types),
                    name: settings.area.areaNames[getRandomInt(0,settings.area.areaNames.length-1)]
                });
            return a;
        },
        areaNames: [
            'Cornwall',
            'Hampshire',
            'Kent',
            'London',
            'Oxfordshire',
            'Essex',
            'Gloucestersh',
            'Marches',
            'Glamorganshi',
            'Gwynedd',
            'Lincolnshire',
            'Lancashire',
            'Yorkshire',
            'Northumberla',
            'Cumbria',
            'Lothian',
            'Ayrshire',
            'Fife',
            'Aberdeenshir',
            'Inverness',
            'Western Isle',
            'Orkney',
            'Tyrone',
            'Pale',
            'Leinster',
            'Limerick',
            'Connaught',
            'Norfolk',
            'Derbyshi',
            'Sutherla',
            'Cork',
            'Sligo',
            'Kildare',
            'Ulster'
        ]
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
    this.type = (json.type === undefined) ? getRandomObject(settings.area.types) : json.type;
    this.size = (json.size === undefined) ? getRandomObjectKey(settings.area.size) : json.size;
    this.name = (json.name === undefined) ? settings.area.areaNames[getRandomInt(0,settings.area.areaNames.length-1)] : json.name;
};
Area.prototype.buildJSON = function() {
    return {
        center: this.center,
        type:this.type,
        size: this.size,
        name: this.name,
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
    var s = this.name + "\t- ("+this.center.x+','+this.center.y+') \t- ' +this.size + " \t- "+this.type;
    return s;
};
