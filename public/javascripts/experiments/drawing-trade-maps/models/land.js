var landSettings = {
    land: {
        defaultNumberOfRegions:6,
        minimumAngleBetweenRoads: 10,//degrees

    },
};
var settings = (settings === undefined)?{}:settings;
settings = mergeSettings(settings,landSettings);
//---------------------------------------------------------- land
function Land(json) {
    this.regions;
    this.loadJSON(json);
}
Land.prototype.loadJSON  = function(json) {
    if (json === undefined) { json = {};}
    this.regions = [];
    if(json.regions) {
        for(var i = 0; i < json.regions.length; i++) {
            this.regions.push(new Region(json.regions[i]));
        }
    } else {
        for(var i = 0; i < settings.land.defaultNumberOfRegions; i++) {
            this.regions.push(settings.region.randomRegion());
        }
    }
    this.roads = [];
    if (json.roads) {
        for(var i = 0; i < json.roads.length; i++) {
            this.roads.push(new Road(json.roads[i]));
        }
    } else {
        this.buildRoads();
    }
};

Land.prototype.buildRoads = function() {
    this.roads = [];
    for(var i =0; i < this.regions.length-1; i++) {
        for(var j = i+1; j < this.regions.length; j++) {
            var r = new Road({org:i,dest:j});
            var hasCollision = false;
            for(var k = 0; k < this.roads.length; k++) {
                var col = doTheseLineSegmentsIntersect(
                    this.regions[r.org].center.x,
                    this.regions[r.org].center.y,
                    this.regions[r.dest].center.x,
                    this.regions[r.dest].center.y,

                    this.regions[this.roads[k].org].center.x,
                    this.regions[this.roads[k].org].center.y,
                    this.regions[this.roads[k].dest].center.x,
                    this.regions[this.roads[k].dest].center.y
                );
                if (col !== false) {
                    if(!(((col.x === this.regions[r.org].center.x) && (col.y === this.regions[r.org].center.y)) ||
                        ((col.x === this.regions[r.dest].center.x) && (col.y === this.regions[r.dest].center.y)))) {
                        hasCollision = true;
                        break;
                    }
                }
            }
            if(!hasCollision) {
                //now check for angle with all other roads coming and going from this region
                var min = 3622135;
                for(var k = 0; k < this.roads.length; k++) {
                    var road = this.roads[k];
                    var angle;
                    var p0,p1,c;
                    if(road.org === r.org) {
                        c = this.regions[r.org].center;
                        p0 = this.regions[r.dest].center;
                        p1 = this.regions[road.dest].center;
                    } else if (road.org === r.dest ) {
                        c = this.regions[r.dest].center;
                        p0 = this.regions[r.org].center;
                        p1 = this.regions[road.dest].center;
                    } else if (road.dest === r.org) {
                        c = this.regions[r.org].center;
                        p0 = this.regions[r.dest].center;
                        p1 = this.regions[road.org].center;
                    } else if (road.dest === r.dest) {
                        c = this.regions[r.dest].center;
                        p0 = this.regions[r.org].center;
                        p1 = this.regions[road.org].center;
                    }
                    var a1 = find_angle(p0,p1,c) * 57.2957795;
                    var a2 = find_angle(p1,p0,c) * 57.2957795;
                    angle = Math.min(a1,a2);
                    print('looking at angle - ' + angle);

                }
                this.roads.push(r);
            }
        }
    }
    //this.removeCloseRoads();
};
Land.prototype.findBorders = function () {
    var borader =[];
    for (var x = 0;  x < settings.canvasSize.w; x++) {
        for (var y = 0; y < settings.canvasSize.h; y++) {

            for (var r = 0; r < this.regions.length; r++) {

            }
        }
    }
};
Land.prototype.draw = function() {
    for(var i = 0;  i < this.regions.length; i++) {
        this.regions[i].draw(this);
    }
    for (var i = 0; i < this.roads.length; i++) {
        this.roads[i].draw(this);
    }
};