var mapSettings = {
    kingdomMap: {
        defaultNumberOfAreas:12
    },
};
var settings = (settings === undefined)?{}:settings;
settings = mergeSettings(settings,mapSettings);
// -------------------------------------------------------------- Map
function KingdomMap(json) {
    this.areas;
    this.loadJSON(json);
}
KingdomMap.prototype.loadJSON  = function(json) {
    if (json === undefined) { json = {};}
    this.areas = [];
    if(json.areas) {
        for(var i = 0; i < json.areas.length; i++) {
            this.areas.push(new Area(json.areas[i]));
        }
    } else {
        for(var i = 0; i < settings.kingdomMap.defaultNumberOfAreas; i++) {
            this.areas.push(settings.area.randomArea());
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
KingdomMap.prototype.buildJSON = function() {
    return {
        center: this.center,
        type:this.type,
        size: this.size
    };
};
KingdomMap.prototype.draw = function () {
    clear();
    push();
    background(settings.color.black);

    this.areas.forEach( function (item, index) {
        item.draw();
    });
    for(var i =0; i <this.roads.length; i++) {
        this.roads[i].draw(this);
    }
    pop();

};


KingdomMap.prototype.buildRoads = function() {
    this.roads = [];
    for(var i =0; i < this.areas.length-1; i++) {
        for(var j = i+1; j < this.areas.length; j++) {
            var r = new Road({org:i,dest:j});
            var hasCollision = false;
            for(var k = 0; k < this.roads.length; k++) {
                var col = doTheseLineSegmentsIntersect(
                        this.areas[r.org].center.x,
                        this.areas[r.org].center.y,
                        this.areas[r.dest].center.x,
                        this.areas[r.dest].center.y,

                        this.areas[this.roads[k].org].center.x,
                        this.areas[this.roads[k].org].center.y,
                        this.areas[this.roads[k].dest].center.x,
                        this.areas[this.roads[k].dest].center.y
                    );
                if (col !== false) {
                    if(!(((col.x === this.areas[r.org].center.x) && (col.y === this.areas[r.org].center.y)) ||
                        ((col.x === this.areas[r.dest].center.x) && (col.y === this.areas[r.dest].center.y)))) {
                        hasCollision = true;
                        break;
                    }
                }
            }
            if(!hasCollision) {
                this.roads.push(r);
            }
        }
    }
    this.removeCloseRoads();
};

KingdomMap.prototype.removeCloseRoads = function () {
    var runAgain = false;
    outer_loop:
    for(var i = this.roads.length-1; i >=0 ;i--) {
        var org = this.areas[this.roads[i].org];
        var sameOrgRoads = [];
        for(var j = 0; j < this.roads.length; j++) {
            if(j !== i) {
                if (this.roads[i].org === this.roads[j].org) {
                    sameOrgRoads.push(j);
                }
            }
        }
        for(var k=0; k < sameOrgRoads.length; k++) {
            print('looking at ' + sameOrgRoads[k]);
            var a = find_angle(
                this.areas[this.roads[i].dest].center,
                this.areas[this.roads[sameOrgRoads[k]]].center,
                this.areas[this.roads[i].org].center
            ) * this.areas[this.roads[i].dest].center;
            if (a < 10) {
                runAgain = true;
                var il = dist(
                    org.center.x,
                    org.center.y,
                    this.areas[this.roads[i].dest].center.x,
                    this.areas[this.roads[i].dest].center.y);
                var kl = dist(
                    org.center.x,
                    org.center.y,
                    this.areas[this.roads[k].dest].center.x,
                    this.areas[this.roads[k].dest].center.y);
                if (kl < il) {
                    this.roads.splice(i,1);
                } else {
                    this.roads.splice(k,1);
                }
                break outer_loop;
            }
        }
    }
    if(runAgain) {
        this.removeCloseRoads();
    }
};