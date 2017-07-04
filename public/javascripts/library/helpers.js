
/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomObject(json) {
    var keys = Object.keys(json);
    if(keys.length > 0) {
        return json[keys[getRandomInt(0,keys.length-1)]];
    }
    return undefined;
}
function getRandomObjectKey(json) {
    var keys = Object.keys(json);
    if(keys.length > 0) {
        return keys[getRandomInt(0,keys.length-1)];
    }
    return undefined;
}
function mergeSettings(base, ext) {
    var ret = {};
    for (var key in base) {
        if(ext.hasOwnProperty(key)) {
            if(typeof  base[key] === typeof ext[key]) {
                console.log('match' + (typeof base[key]));
                if(base[key] instanceof Array && ext[key] instanceof Array) {
                    ret[key] = base[key].concat(ext[key]).unique();
                } else if(typeof base[key] == 'object') {
                    ret[key] = mergeSettings(base[key],ext[key]);
                } else {
                    ret[key] = base[key];
                }
            } else {
                ret[key] = base[key];
            }
        } else {
            ret[key] = base[key];
        }
    }
    for(var key in ext) {
        if(!ret.hasOwnProperty(key)) { //add those extention properties that aren't there yet
            ret[key] = ext[key];
        }
    }
    return ret;
}
Array.prototype.unique = function() {
    var a = this.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;
};
function convertCanvasToImage(canvas) {
    var image = new Image();
    image.src = canvas.toDataURL("image/png");
    return image;
}