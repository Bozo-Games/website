var regionSettings = {
    region: {
        types: {
            lake: 'lake',
            plain: 'plain',
            marsh: 'marsh',
            desert: 'desert',
            mountain: 'mountain'
        },
        sizeRange: {
            min: 10,
            max:30
        },
        randomRegion: function () {
            var a = new Region(
                {
                    center: {
                        x:getRandomInt(2,settings.canvasSize.w/settings.region.offset)*settings.region.offset -  settings.region.offset,
                        y:getRandomInt(2,settings.canvasSize.h/settings.region.offset)*settings.region.offset - settings.region.offset
                    },
                    type: getRandomObject(settings.region.types),
                    size: getRandomInt(settings.region.sizeRange.min, settings.region.sizeRange.max),
                    name: getRandomObject(settings.region.names)
                });
            return a;
        },
        offset: 50,
        names: ['Cornwall','Hampshire','Kent','London','Oxfordshire','Essex','Gloucestersh','Marches','Glamorganshi','Gwynedd','Lincolnshire','Lancashire','Yorkshire','Northumberla','Cumbria','Lothian','Ayrshire','Fife','Aberdeenshir','Inverness','Western Isle','Orkney','Tyrone','Pale','Leinster','Limerick','Connaught','Norfolk','Derbyshi','Sutherla','Cork','Sligo','Kildare','Ulster']
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
settings = mergeSettings(settings,regionSettings);
//--------------------------------------------------------------- Region
function Region(json) {
    this.loadJSON(json);
}
Region.prototype.loadJSON  = function(json) {
    if (json === undefined) { json = {};}
    this.center = (json.center === undefined) ? {x:getRandomInt(1,settings.canvasSize.w/settings.region.offset)*settings.region.offset , y:getRandomInt(1,settings.canvasSize.h/settings.region.offset)*settings.region.offset}:json.center;
    this.type = (json.type === undefined) ? getRandomObject(settings.region.types) : json.type;
    this.size = (json.size === undefined) ? getRandomInt(settings.region.sizeRange.min, settings.region.sizeRange.max): json.size;
    this.name = (json.name === undefined) ? getRandomObject(settings.region.names)  : json.name;

    this.center = createVector(this.center.x, this.center.y);
};
Region.prototype.buildJSON = function() {
    return {
        center: {x:this.center.x,y:this.center.y},
        type:this.type,
        size: this.size,
        name: this.name,
    };
};
Region.prototype.draw = function (land) {
    push();
    fill(settings.color[this.type]);
    //(x - center_x)^2 + (y - center_y)^2 < radius^2
    if(Math.pow(mouseX - this.center.x,2) + Math.pow(mouseY - this.center.y,2) < Math.pow(this.size,2) ) {
        stroke(settings.color.white);
        strokeWeight(2);
        debugRegion = this;
    } else {
        noStroke();
    }
    ellipse(this.center.x,this.center.y, this.size*2);
    pop();
};
Region.prototype.debugText = function() {
    var s = this.name + "\t- ("+this.center.x+','+this.center.y+') \t- ' +this.size + " \t- "+this.type;
    return s;
};