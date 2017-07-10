var settings = (settings === undefined)?{}:settings;
settings["color"] = {
    isLoaded: false,
    load: function() {
        //settings.color = {};
        for (var key in settings.colorStrings) {
            settings.color[key] = color(settings.colorStrings[key]);
        }
    },
    colorFromJSON: function (json) {
        return color(
            (json.r === undefined) ? 128 : json.r,
            (json.g === undefined) ? 128 : json.g,
            (json.b === undefined) ? 128 : json.b,
            (json.a === undefined) ? 255 : json.a
        );
    },
    getRandomColorByIndex: function () {
        var keys = Object.keys(settings.color);
        for(var i = keys.length-1; i >= 0; i--) {
            if(keys[i] === "isLoaded" || keys[i] === "load" || keys[i] === "getRandomColor") {
                keys.splice(i,1);
            }
        }
        if(keys.length > 0) {
            return settings.color[keys[getRandomInt(0,keys.length-1)]];
        }
        return undefined;
    }
};
p5.Color.prototype.buildJSON = function () {
    return {
        r:this._getRed(),
        g:this._getGreen(),
        b:this._getBlue(),
        a:this._getAlpha()
    }
};
var defaultColorStrings = {
    colorStrings: {
        black: '#000000',
        red:'#ff0000',
        green: '#00ff00',
        blue: '#0000ff',
        yellow: '#ffff00',
        cyan: '#00ffff',
        purple: '#ff00ff',
        white: '#ffffff',
        lightGray: '#ababab',
        gray: '#777777',
        darkGray: '#333333'
    }
};

settings = mergeSettings(settings,defaultColorStrings);
var settings = (settings === undefined)?{}:settings;
